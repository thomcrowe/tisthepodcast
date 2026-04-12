import { parse as parseFeed } from 'rss-to-json'

const FEED_URL = 'https://feed.podbean.com/tisthepodcast/feed.xml'

// Extract the show/movie/special title from an episode title like:
// "It Feels Like Christmas! (The Muppet Christmas Carol)"  →  "The Muppet Christmas Carol"
// "Quote... (Show Title...)"  →  "Show Title"
export function extractShowTitle(rawTitle) {
  const match = rawTitle.match(/\(([^)]+?)\)?\.?\s*$/)
  if (match) {
    return match[1].replace(/\.{2,}$/, '').trim()
  }
  return rawTitle.trim()
}

// Fetch a poster image URL from the iTunes Search API (free, no key required).
// Next.js caches the fetch response for 30 days so we don't hammer the API.
export async function getItunesPoster(title) {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(title)}&limit=3&country=us`
    const res = await fetch(url, { next: { revalidate: 2592000 } })
    if (!res.ok) return null
    const data = await res.json()
    const artwork = data.results?.[0]?.artworkUrl100
    if (artwork) {
      // Replace the 100x100 thumbnail with a 600x600 version
      return artwork.replace('100x100bb', '600x600bb')
    }
  } catch {
    // ignore – poster is optional
  }
  return null
}

// Returns all episodes sorted chronologically (episode 1 first), with
// extracted show titles. Used by The List page.
export async function getAllEpisodesForList() {
  const feed = await parseFeed(FEED_URL)

  return feed.items
    .filter((item) => item.itunes_episode) // skip bonus/unnumbered episodes
    .map(({ title, published, link, itunes_episode }) => ({
      id: link
        .replace('https://tisthepodcast.podbean.com/e/', '')
        .replace(/\/+$/, ''),
      episodeNumber: parseInt(itunes_episode, 10),
      rawTitle: title,
      showTitle: extractShowTitle(title),
      published: new Date(published),
    }))
    .sort((a, b) => a.episodeNumber - b.episodeNumber)
}

export async function getAllEpisodes() {
  let feed = await parseFeed(
    'https://feed.podbean.com/tisthepodcast/feed.xml',
  )

  let episodes = feed.items.map(
    ({ title, description, content, enclosures, published, link, itunes_episode }) => ({
      id: link
        .replace('https://tisthepodcast.podbean.com/e/', '')
        .replace(/\/+$/, ''),
      title: `${itunes_episode ?? 'Bonus'}: ${title}`,
      published: new Date(published),
      description,
      content,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }),
  )

  return episodes
}
