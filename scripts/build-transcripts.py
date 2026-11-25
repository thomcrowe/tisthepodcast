#!/usr/bin/env python3
"""Turn raw Whisper output into the cleaned transcript JSON the site renders.

Usage:
    python3 scripts/build-transcripts.py <raw-dir> [--live-date YYYY-MM-DD]

<raw-dir> holds one JSON file per episode, as written by mlx-whisper /
faster-whisper: {"id": "<podcast-episode-id>", "segments": [{start, end, text}]}.

Cleanup is deliberately light — we never rewrite what the hosts said:
  * fix known mis-hearings of names (NAME_FIXES, plus per-episode fixes)
  * drop filler-only lines ("Yeah." "Mm-hmm." "Okay.") and Whisper's
    repeated-line hallucinations
  * drop stand-alone "um"/"uh"
  * group lines into paragraphs (on pauses) and sections with a timestamped
    H3 roughly every 5–10 minutes

Writes src/data/transcripts/<id>.json and regenerates src/data/transcripts/index.js.
"""

import argparse
import datetime as dt
import glob
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'src', 'data', 'transcripts')

# Applied to every episode. (pattern, replacement) — regexes, case-sensitive.
NAME_FIXES = [
    # Host name: Whisper hears "Thom Crowe" as "Tom Crow" and "Thom" as "Tom".
    (r"\bTom Crow\b", 'Thom Crowe'),
    # Leave real Toms alone ("Tom Hanks", "Tom Brady", ...).
    (r"\bTom\b(?!\s+[A-Z][a-z])", 'Thom'),
    (r"\bTiz the [Pp]odcast\b", 'Tis the Podcast'),
    (r"\b[Tt]is the podcast\b", 'Tis the Podcast'),
    (r"\bJerry Davila\b", 'Gerry Davila'),
]

# Per-episode fixes for names Whisper gets wrong in that episode only.
EPISODE_FIXES = {
    'oy-to-the-world-the-nanny-chrismukkah-episodes': [
        (r'\bCece\b', 'C.C.'),
        (r'\bCC\b', 'C.C.'),
        (r'\b([Tt]he) NRA\b', r'\1 Nanny'),
        (r'\bRachel Chaggle\b', 'Rachel Chagall'),
        (r'\bAnne Morgan Gilbert\b', 'Ann Morgan Guilbert'),
        (r'\bNicholas Holtz\b', 'Nicholas Hoult'),
    ],
    'christmas-is-all-around': [
        (r'\bBilly Mac\b', 'Billy Mack'),
        (r'\bLaura Lenny\b', 'Laura Linney'),
    ],
    'merry-christmas-to-those-who-have-who-have-seen-us-at-our-best-and-at-our-worst-and-cant-tell-the-difference': [
        (r'\bFargus\b', 'Fergus'),
    ],
    'i-saw-mommy-kissing-santa-claus-1597868106': [
        (r'\bCorbin Bernson\b', 'Corbin Bernsen'),
        (r'\bAlf\b', 'ALF'),
        (r'\bJerry\b(?! Seinfeld)', 'Gerry'),
    ],
    'jingle-bells-batmansmells-robinlaidan-egg-the-batmobile-lost-a-wheelandthe-jokergot-awaythechristmasepisodes-of-batmantheanimated-seriesandjustice': [
        (r'\bJerry\b', 'Gerry'),
        (r'\bClive Revel\b', 'Clive Revill'),
        (r'\bEphraim Zimbalist\b', 'Efrem Zimbalist'),
        (r'\bMary Devin\b', 'Mari Devon'),
        (r'\bLeanne Schreimer\b', 'Liane Schirmer'),
        (r'\bTara Cherendoff\b', 'Tara Charendoff'),
    ],
}

# Where the hosts' conversation ends, in seconds. Everything after is outro
# music / song clips (copyrighted lyrics we must not publish) or Whisper junk.
# The start is found automatically: the "Welcome (back) to ... Tis the
# Podcast" line that follows the cold-open clip montage.
END_AT = {
    'christmas-is-all-around': 5098,
    'i-saw-mommy-kissing-santa-claus-1597868106': 4374.5,
    'jingle-bells-batmansmells-robinlaidan-egg-the-batmobile-lost-a-wheelandthe-jokergot-awaythechristmasepisodes-of-batmantheanimated-seriesandjustice': 5853,
    'looks-like-our-pal-the-mothman-is-up-to-his-old-tricks-the-mothman-prophecies': 3830,
    'merry-christmas-to-those-who-have-who-have-seen-us-at-our-best-and-at-our-worst-and-cant-tell-the-difference': 3842,
    'oy-to-the-world-the-nanny-chrismukkah-episodes': 5473.5,
    'this-is-halloween-1509328256': 5352.5,
    'why-don-t-you-and-i-just-roll-on-back-to-the-playroom-the-christmas-toy': 3776.5,
    'on-halloween-night-the-great-pumpkin-rises-out-of-his-pumpkin-patch-and-flies-through-the-air-with-his-bag-of-toys-for-all-the-children': 2677,
}

# Passages where the hosts sing or recite song lyrics. Replaced with a
# bracketed note so no lyrics are published. (start, end, note) in seconds.
REDACT = {
    'and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most': [
        (190, 216, '[A few lines of "You\'re a Mean One, Mr. Grinch."]'),
    ],
    'oy-to-the-world-the-nanny-chrismukkah-episodes': [
        (800, 843.5, "[The hosts sing The Nanny's theme song.]"),
        (1040, 1061.5, '[Recites the theme song lyrics.]'),
    ],
}

WELCOME = re.compile(r"(welcome( back)? to (another|the|tis|a special)|hello,? listeners,? and welcome)", re.I)

FILLER_WORDS = {
    'yeah', 'yep', 'yes', 'yup', 'okay', 'ok', 'right', 'mm', 'mmhmm', 'mhm',
    'uh', 'um', 'uhhuh', 'oh', 'ah', 'wow', 'sure', 'no', 'nope', 'nice',
    'cool', 'true', 'exactly', 'totally', 'hmm', 'huh', 'ooh', 'so', 'and',
    'well', 'like', 'i', 'mean', 'gotcha', 'definitely', 'absolutely', 'bye',
}

PARA_GAP = 1.2         # seconds of silence that starts a new paragraph
PARA_MAX_CHARS = 700   # soft cap on paragraph length
SECTION_MIN = 5 * 60   # seconds
SECTION_TARGET = 7 * 60
SECTION_MAX = 10 * 60  # hard cap: break even mid-paragraph run
PARA_HARD_MAX = 1200   # break long unpunctuated runs too


def is_filler(text):
    words = re.sub(r"[^a-z\s]", '', text.lower().replace('-', '')).split()
    return len(words) == 0 or all(w in FILLER_WORDS for w in words)


def clean_text(text, fixes):
    t = text.strip()
    t = re.sub(r'(?i)(^|[\s,])(um|uh)[,.]?(?=\s|$)', r'\1', t)
    for pat, rep in fixes:
        t = re.sub(pat, rep, t)
    return re.sub(r'\s{2,}', ' ', t).strip()


def build(raw):
    eid = raw['id']
    fixes = NAME_FIXES + EPISODE_FIXES.get(eid, [])
    raw_segs = raw['segments']
    start_at = next(
        (s['start'] for s in raw_segs if s['start'] < 180 and WELCOME.search(s['text'])),
        0,
    )
    end_at = END_AT.get(eid, float('inf'))
    redact = REDACT.get(eid, [])

    segs, prev = [], None
    for s in raw_segs:
        if s['start'] < start_at or s['start'] >= end_at:
            continue
        note = next((n for a, b, n in redact if a <= s['start'] < b), None)
        if note:
            if prev != note:
                segs.append({'start': s['start'], 'end': s['end'], 'text': note})
                prev = note
            continue
        text = clean_text(s['text'], fixes)
        if (
            not text
            or is_filler(text)
            or text == prev
            or re.search(r'[^\x00-\u024F\u2000-\u206F]', text)  # non-Latin junk
        ):
            continue
        prev = text
        segs.append({'start': s['start'], 'end': s['end'], 'text': text})

    sections, cur, para = [], None, None
    last_end = 0.0
    for s in segs:
        over_cap = cur is not None and s['start'] - cur['start'] >= SECTION_MAX
        new_para = (
            para is None
            or over_cap
            or s['start'] - last_end > PARA_GAP
            or (len(para['text']) > PARA_MAX_CHARS and re.search(r'[.!?]["”]?$', para['text']))
            or len(para['text']) > PARA_HARD_MAX
        )
        if new_para:
            if para:
                cur['paragraphs'].append(para)
            # Sections break only on paragraph boundaries.
            if cur is None or over_cap or (
                s['start'] - cur['start'] >= SECTION_TARGET
                or (s['start'] - cur['start'] >= SECTION_MIN and s['start'] - last_end > 2.5)
            ):
                if cur:
                    sections.append(cur)
                cur = {'start': round(s['start'], 1), 'heading': None, 'paragraphs': []}
            para = {'t': round(s['start'], 1), 'text': s['text']}
        else:
            para['text'] += ' ' + s['text']
        last_end = s['end']
    if para:
        cur['paragraphs'].append(para)
    if cur:
        sections.append(cur)
    return {
        'id': eid,
        'source': 'Whisper large-v3-turbo (mlx-whisper), lightly edited',
        'sections': sections,
        'wordCount': sum(len(p['text'].split()) for sec in sections for p in sec['paragraphs']),
    }


def write_index():
    files = sorted(f for f in os.listdir(OUT_DIR) if f.endswith('.json'))
    lines = ['// Generated by scripts/build-transcripts.py — do not edit by hand.']
    for i, f in enumerate(files):
        lines.append(f"import t{i} from './{f}'")
    lines.append('')
    lines.append('const transcripts = {')
    for i, f in enumerate(files):
        lines.append(f"  [t{i}.id]: t{i},")
    lines.append('}')
    lines.append('')
    lines.append('export default transcripts')
    with open(os.path.join(OUT_DIR, 'index.js'), 'w') as fh:
        fh.write('\n'.join(lines) + '\n')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('raw_dir')
    ap.add_argument('--live-date', default=dt.date.today().isoformat())
    args = ap.parse_args()
    os.makedirs(OUT_DIR, exist_ok=True)
    for path in sorted(glob.glob(os.path.join(args.raw_dir, '*.json'))):
        raw = json.load(open(path))
        if 'segments' not in raw:
            continue
        out = build(raw)
        out['liveDate'] = args.live_date
        dest = os.path.join(OUT_DIR, f"{raw['id']}.json")
        with open(dest, 'w') as fh:
            json.dump(out, fh, ensure_ascii=False, separators=(',', ':'))
        print(f"{raw['id'][:60]}: {len(out['sections'])} sections, {out['wordCount']} words")
    write_index()


if __name__ == '__main__':
    main()
