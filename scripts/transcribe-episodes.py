#!/usr/bin/env python3
"""Transcribe episodes on this Mac with Whisper — free, nothing leaves the machine.

Step 1 of 2. This writes raw Whisper output; step 2 is
scripts/build-transcripts.py, which cleans it up for the site.

One-time setup (Apple Silicon Mac):
    brew install ffmpeg
    python3 -m pip install mlx-whisper

Usage:
    # the priority list (scripts/transcribe-priority.txt), 10 at a time
    python3 scripts/transcribe-episodes.py --limit 10

    # specific episodes
    python3 scripts/transcribe-episodes.py --ids fresh-prince a-flintstone-christmas

    # every episode from one year
    python3 scripts/transcribe-episodes.py --year 2019

    # redo episodes that already have a transcript
    python3 scripts/transcribe-episodes.py --force --ids fresh-prince

Then:
    python3 scripts/build-transcripts.py transcripts-raw --live-date YYYY-MM-DD

Skips episodes that already have a transcript (src/data/transcripts/) or raw
output (transcripts-raw/), and the pilot's control pages (transcripts-pilot.md)
so the pilot comparison stays clean. Safe to stop and re-run at any time.
"""

import argparse
import json
import os
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FEED_URL = 'https://feed.podbean.com/tisthepodcast/feed.xml'
DONE_DIR = os.path.join(ROOT, 'src', 'data', 'transcripts')
RAW_DIR = os.path.join(ROOT, 'transcripts-raw')
AUDIO_DIR = os.path.join(ROOT, 'transcripts-raw', 'audio')
PRIORITY_FILE = os.path.join(ROOT, 'scripts', 'transcribe-priority.txt')
PILOT_DOC = os.path.join(ROOT, 'transcripts-pilot.md')
MODEL = 'mlx-community/whisper-large-v3-turbo'

# Primes Whisper with names it otherwise mishears. build-transcripts.py still
# applies NAME_FIXES afterwards.
PROMPT = (
    'Welcome to Tis the Podcast, the Christmas movie podcast. '
    "I'm Anthony Caruso, I'm Julia Colburn, and I'm Thom Crowe."
)


def to_ascii_slug(value):
    """Mirror of toAsciiSlug() in src/lib/episodes.js."""
    s = urllib.parse.unquote(value)
    if s.isascii():
        return s
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"['‘’ʼ]", '', s).lower()
    s = re.sub(r'[^a-z0-9-]+', '-', s)
    return re.sub(r'-{2,}', '-', s).strip('-')


def load_feed():
    with urllib.request.urlopen(FEED_URL, timeout=60) as r:
        root = ET.fromstring(r.read())
    episodes = []
    for item in root.iter('item'):
        link = (item.findtext('link') or '').rstrip('/')
        enclosure = item.find('enclosure')
        if not link or enclosure is None:
            continue
        episodes.append({
            'id': to_ascii_slug(link.split('/')[-1]),
            'title': item.findtext('title') or '',
            'year': parsedate_to_datetime(item.findtext('pubDate')).year,
            'audio': enclosure.get('url'),
        })
    return episodes


def control_ids():
    if not os.path.exists(PILOT_DOC):
        return set()
    text = open(PILOT_DOC, encoding='utf-8').read()
    section = text.split('## Control pages', 1)[-1].split('\n## ', 1)[0]
    return set(re.findall(r'^- /(\S+)', section, re.M))


def already_done(eid):
    return os.path.exists(os.path.join(DONE_DIR, f'{eid}.json')) or os.path.exists(
        os.path.join(RAW_DIR, f'{eid}.json')
    )


def download(url, eid):
    os.makedirs(AUDIO_DIR, exist_ok=True)
    path = os.path.join(AUDIO_DIR, f'{eid}.mp3')
    if not os.path.exists(path):
        req = urllib.request.Request(url, headers={'User-Agent': 'tisthepodcast-transcriber'})
        with urllib.request.urlopen(req, timeout=300) as r, open(path + '.part', 'wb') as f:
            while chunk := r.read(1 << 20):
                f.write(chunk)
        os.replace(path + '.part', path)
    return path


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--ids', nargs='*', help='episode ids (the URL slug after tisthepodcast.com/)')
    ap.add_argument('--year', type=int, help='every episode released that year')
    ap.add_argument('--limit', type=int, default=0, help='stop after this many episodes')
    ap.add_argument('--model', default=MODEL)
    ap.add_argument('--keep-audio', action='store_true', help="don't delete the mp3 afterwards")
    ap.add_argument('--force', action='store_true', help='redo episodes that already have a transcript')
    args = ap.parse_args()

    try:
        import mlx_whisper
    except ImportError:
        sys.exit('mlx-whisper is not installed. Run: python3 -m pip install mlx-whisper')

    episodes = {e['id']: e for e in load_feed()}

    if args.ids:
        wanted = args.ids
    elif args.year:
        wanted = [e['id'] for e in episodes.values() if e['year'] == args.year]
    else:
        wanted = [
            line.split('#')[0].strip()
            for line in open(PRIORITY_FILE, encoding='utf-8')
            if line.split('#')[0].strip()
        ]

    skip = control_ids()
    queue = []
    for eid in wanted:
        if eid not in episodes:
            print(f'  ? not in feed, skipping: {eid}')
        elif eid in skip:
            print(f'  - pilot control page, skipping: {eid}')
        elif args.force or not already_done(eid):
            queue.append(episodes[eid])
    if args.limit:
        queue = queue[: args.limit]

    print(f'{len(queue)} episode(s) to transcribe with {args.model}\n')
    os.makedirs(RAW_DIR, exist_ok=True)
    for n, ep in enumerate(queue, 1):
        print(f'[{n}/{len(queue)}] {ep["title"]}')
        audio = download(ep['audio'], ep['id'])
        result = mlx_whisper.transcribe(
            audio,
            path_or_hf_repo=args.model,
            initial_prompt=PROMPT,
            # Keep this True: Whisper uses the previous window's text to keep
            # casing and punctuation. With it off, output drifts into
            # lowercase run-on text. Repeated-line hallucinations are dropped
            # later by build-transcripts.py.
            condition_on_previous_text=True,
            verbose=False,
        )
        segments = [
            {'start': round(s['start'], 2), 'end': round(s['end'], 2), 'text': s['text'].strip()}
            for s in result['segments']
        ]
        out = os.path.join(RAW_DIR, f'{ep["id"]}.json')
        with open(out, 'w', encoding='utf-8') as f:
            json.dump({'id': ep['id'], 'segments': segments}, f, ensure_ascii=False)
        if not args.keep_audio:
            os.remove(audio)
        print(f'    -> {os.path.relpath(out, ROOT)} ({len(segments)} segments)\n')

    print('Done. Next: python3 scripts/build-transcripts.py transcripts-raw --live-date YYYY-MM-DD')


if __name__ == '__main__':
    main()
