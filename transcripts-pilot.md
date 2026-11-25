# Transcript pilot

**Question:** do full transcripts on episode pages earn more search impressions and clicks?

**Transcripts went live:** _2026-11-25 (fill in the actual production deploy date if the PR merges later)_
**Compare in Search Console on:** 2026-12-23 (4 weeks) and 2027-01-06 (6 weeks)

## Pilot pages (10)

Picked by the brief (first 4), then by Google-referred visits in Vercel Web Analytics over the last 12 months (next 6) — used as a stand-in for Search Console impressions, which weren't available. Swap in a Search Console Pages export if you want the ranking to be impressions-based.

| # | Page | Episode | Why it's in the pilot | Words |
|---|------|---------|-----------------------|------:|
| 1 | [/oy-to-the-world-the-nanny-chrismukkah-episodes](https://tisthepodcast.com/oy-to-the-world-the-nanny-chrismukkah-episodes) | The Nanny Chrismukkah episodes | Brief (688 impr. for "the nanny christmas episodes list", pos 2.9) | 13,331 |
| 2 | [/christmas-is-all-around](https://tisthepodcast.com/christmas-is-all-around) → canonical [/reviews/love-actually](https://tisthepodcast.com/reviews/love-actually) | Love Actually | Brief | 13,626 |
| 3 | [/and-the-grinch-raised-his-glass-…](https://tisthepodcast.com/and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most) | Dr. Seuss' The Grinch (2018) | Brief | 9,574 |
| 4 | [/jingle-bells-batmansmells-…](https://tisthepodcast.com/jingle-bells-batmansmells-robinlaidan-egg-the-batmobile-lost-a-wheelandthe-jokergot-awaythechristmasepisodes-of-batmantheanimated-seriesandjustice) | Batman: TAS / Justice League | Brief | 14,943 |
| 5 | [/i-saw-mommy-kissing-santa-claus-1597868106](https://tisthepodcast.com/i-saw-mommy-kissing-santa-claus-1597868106) | I Saw Mommy Kissing Santa Claus (2001) | 43 Google visitors (via the old `/episode-161-…` URL, now 308'd here) | 12,523 |
| 6 | [/merry-christmas-to-those-who-have-…](https://tisthepodcast.com/merry-christmas-to-those-who-have-who-have-seen-us-at-our-best-and-at-our-worst-and-cant-tell-the-difference) | Crown for Christmas | 42 Google visitors | 10,811 |
| 7 | [/looks-like-our-pal-the-mothman-…](https://tisthepodcast.com/looks-like-our-pal-the-mothman-is-up-to-his-old-tricks-the-mothman-prophecies) | The Mothman Prophecies | 9 | 9,225 |
| 8 | [/this-is-halloween-1509328256](https://tisthepodcast.com/this-is-halloween-1509328256) | The Nightmare Before Christmas | 9 | 16,537 |
| 9 | [/why-don-t-you-and-i-just-roll-on-back-…](https://tisthepodcast.com/why-don-t-you-and-i-just-roll-on-back-to-the-playroom-the-christmas-toy) | The Christmas Toy | 7 | 9,207 |
| 10 | [/on-halloween-night-the-great-pumpkin-…](https://tisthepodcast.com/on-halloween-night-the-great-pumpkin-rises-out-of-his-pumpkin-patch-and-flies-through-the-air-with-his-bag-of-toys-for-all-the-children) | It's the Great Pumpkin, Charlie Brown | 6 (tie with Casper and Fresh Prince; broken on pageviews) | 7,046 |

## Control pages (no transcript)

Similar Google-referred traffic, similar page type. Leave these alone until the comparison is done.

- /can-i-keep-you-casper
- /fresh-prince
- /welcome-foolish-muppets-muppets-haunted-mansion
- /in-this-town-michael-myers-is-a-myth-he-s-the-boogeyman-a-ghost-story-to-scare-kids-but-this-boogeyman-is-real-halloween-2018
- /keep-the-change-ya-filthy-animal
- /salami-sticks-again-this-year-ray-christmas-eve-in-millers-point
- /trixie-the-battlesaurs-are-not-playing
- /frosty-the-snowman-is-a-fairy-tale-they-say-he-was-made-of-snow-but-the-children-know-how-he-came-to-life-one-day
- /and-may-it-be-shiny-too
- /nobodys-elving-mom

**Caveat:** the SEO push (titles, descriptions, episode lists) shipped on 2026-11-25 to *all* episode pages, pilot and control alike, and December is peak season for everything. Compare the pilot group's change against the control group's change over the same window, not against last month.

## What to compare

Search Console → Performance → Pages, filter to each group, date range = 28 days after go-live vs. the 28 days before:
- impressions, clicks, CTR, average position
- number of distinct queries per page (Queries tab with the page filter). Transcripts should mostly show up as *new long-tail queries*.

## How the transcripts were made

- Audio: the Podbean RSS enclosures.
- Model: Whisper large-v3-turbo via `mlx-whisper`, on-device. No speaker labels (diarization needs a gated pyannote model and an HF token; not set up).
- Cleanup (`scripts/build-transcripts.py`): name fixes (host "Thom", guest names, cast names), filler-only lines dropped, paragraphs on pauses, a timestamped H3 every ~5–10 min.
- **Removed:** the cold-open clip montage, outro songs, and any passage where the hosts sing or recite song lyrics (replaced with a bracketed note). We can't publish copyrighted lyrics or film audio.
- Rendered server-side inside a `<details>` "Read the transcript" block below the show notes, with a jump link near the top. On Love Actually it also appears on the canonical review page.

To add more episodes: transcribe to `{id, segments:[{start,end,text}]}` JSON, add any `END_AT` / `REDACT` / name-fix entries, and run
`python3 scripts/build-transcripts.py <raw-dir> --live-date YYYY-MM-DD`.
