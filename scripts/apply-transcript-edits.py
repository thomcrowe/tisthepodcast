#!/usr/bin/env python3
"""Apply hand edits to a published transcript.

Usage: python3 scripts/apply-transcript-edits.py <episode-id> <edits.json>

edits.json maps "section.paragraph" (0-based, as in the transcript JSON) to a
list of replacement paragraphs. Each replacement is usually one speaker turn,
so a long run-on paragraph becomes several readable ones. An empty list
removes the paragraph (e.g. when its text was folded into the one before).
The first replacement keeps the original paragraph's timestamp.
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
eid, edits_path = sys.argv[1], sys.argv[2]
path = os.path.join(ROOT, 'src', 'data', 'transcripts', f'{eid}.json')
d = json.load(open(path, encoding='utf-8'))
edits = json.load(open(edits_path, encoding='utf-8'))

for si, sec in enumerate(d['sections']):
    out = []
    for pi, para in enumerate(sec['paragraphs']):
        key = f'{si}.{pi}'
        if key not in edits:
            out.append(para)
            continue
        for n, text in enumerate(edits[key]):
            new = {'text': text.strip()}
            if n == 0 and 't' in para:
                new = {'t': para['t'], **new}
            out.append(new)
    sec['paragraphs'] = out

# A paragraph that starts lowercase is the tail of a sentence cut off at a
# section break; join it back onto the paragraph before it.
prev = None
for sec in d['sections']:
    keep = []
    for para in sec['paragraphs']:
        if prev is not None and para['text'][:1].islower():
            prev['text'] = prev['text'].rstrip() + ' ' + para['text']
            continue
        keep.append(para)
        prev = para
    sec['paragraphs'] = keep
d['sections'] = [sec for sec in d['sections'] if sec['paragraphs']]

d['wordCount'] = sum(len(p['text'].split()) for s in d['sections'] for p in s['paragraphs'])
d['source'] = 'Whisper large-v3-turbo (mlx-whisper), edited for punctuation, casing, and speaker turns'
with open(path, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, separators=(',', ':'))
print(f'{eid}: {len(edits)} paragraphs edited, {d["wordCount"]} words')
