// "More episodes like this" for episode pages: internal links that help
// crawlers and readers move between related episodes.
import { TV_SHOWS, getTvCoverageForEpisode } from '@/data/tv-shows'

const TV_EPISODE_IDS = new Set(TV_SHOWS.flatMap((s) => s.coverage.map((c) => c.id)))

const STOP = new Set([
  'the', 'a', 'an', 'of', 'and', 'dr', 'seuss', 'seuss\'', 'christmas', 'holiday',
  'special', 'movie', 'episodes', 'episode', 'season', 'part', 'revisited',
  'national', 'lampoon\'s', 'disney\'s', 'how', 'to', 'in', 'on', 'for',
])

// The two most distinctive words of a title, e.g. "Home Alone 2: Lost in
// New York" → "home alone"; "Dr. Seuss' The Grinch [2018]" → "grinch".
function franchiseKey(title) {
  const words = title
    .toLowerCase()
    .replace(/\[[^\]]*\]|\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w) && !/^\d+$/.test(w))
  return words.slice(0, 2).join(' ')
}

const isChapter = (e) => e.id.startsWith('another-christmas-story')

export function getRelatedEpisodes(episode, allEpisodes, limit = 6) {
  const picked = []
  const seen = new Set([episode.id])
  const add = (e, reason) => {
    if (e && !seen.has(e.id) && picked.length < limit) {
      seen.add(e.id)
      picked.push({ episode: e, reason })
    }
  }
  const byId = new Map(allEpisodes.map((e) => [e.id, e]))

  // 1. Other parts of the same TV show
  const tv = getTvCoverageForEpisode(episode.id)
  if (tv) {
    for (const cov of tv.show.coverage) add(byId.get(cov.id), `More ${tv.show.name}`)
  }

  // 2. Same franchise (sequels, remakes, other versions)
  // Keys match when equal, or when one is a whole-word prefix of the other
  // ("grinch" ~ "grinch stole"), so remakes and sequels group together.
  const key = franchiseKey(episode.showTitle)
  const sameFranchise = (k) =>
    k === key || (k && key && (k.startsWith(`${key} `) || key.startsWith(`${k} `)))
  if (key && key.length >= 4) {
    for (const e of allEpisodes) {
      if (isChapter(e)) continue
      if (sameFranchise(franchiseKey(e.showTitle))) add(e, 'Same franchise')
    }
  }

  // 2b. For TV pages: other TV Christmas episodes closest in release date
  // (the hosts tend to cover TV in themed runs, e.g. "TV month").
  if (tv) {
    const t = new Date(episode.published).getTime()
    allEpisodes
      .filter((e) => TV_EPISODE_IDS.has(e.id) && e.id !== episode.id)
      .sort(
        (a, b) =>
          Math.abs(new Date(a.published).getTime() - t) -
          Math.abs(new Date(b.published).getTime() - t),
      )
      .slice(0, 4)
      .forEach((e) => add(e, 'More TV Christmas episodes'))
  }

  // 3. Neighbouring episodes in release order
  const idx = allEpisodes.findIndex((e) => e.id === episode.id)
  if (idx !== -1) {
    // allEpisodes is newest-first (RSS order). Skip audiobook chapters.
    const step = (dir) => {
      for (let i = idx + dir; i >= 0 && i < allEpisodes.length; i += dir) {
        if (!isChapter(allEpisodes[i])) return allEpisodes[i]
      }
      return null
    }
    add(step(1), 'Previous episode')
    add(step(-1), 'Next episode')
  }
  return picked
}
