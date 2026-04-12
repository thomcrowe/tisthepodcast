import { parse as parseFeed } from 'rss-to-json'
import posterData from '@/data/episode-posters.json'

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

// Look up a poster URL from the pre-built CSV-sourced data file.
export function getPosterFromData(episodeNumber) {
  return posterData[String(episodeNumber)] || null
}

// Returns all episodes sorted chronologically (episode 1 first), with
// extracted show titles. Used by The Watch List page.
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
