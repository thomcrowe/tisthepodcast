import { parse as parseFeed } from 'rss-to-json'
import posterData from '@/data/episode-posters.json'

const FEED_URL = 'https://feed.podbean.com/tisthepodcast/feed.xml'

// Manual year overrides for early episodes whose descriptions predate the
// "the YYYY film" convention. Add entries here as needed.
const SHOW_YEAR_OVERRIDES = {
  'Elf': '2003',
}

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

function stripHtmlBasic(html) {
  return html?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() ?? ''
}

// Try to extract the release year from an episode description.
// Matches patterns like "the 2003 film", "the 2024, Netflix original movie", etc.
export function extractYearFromDescription(description) {
  const plain = stripHtmlBasic(description)

  // "the/a YYYY ... film/movie/special/series" (within ~80 chars of the year)
  const mediaMatch = plain.match(
    /\b(?:the|a)\s+(19[4-9]\d|20[0-2]\d)\b[^.!?]{0,80}\b(?:film|movie|special|series|documentary)\b/i,
  )
  if (mediaMatch) return mediaMatch[1]

  // "YYYY's [Title]" like "1989's National Lampoon's Christmas Vacation"
  // Limit to pre-2020 to avoid matching podcast production years
  const apostropheMatch = plain.match(/\b(19[4-9]\d|200\d|201\d)\b's\s+[A-Z]/)
  if (apostropheMatch) return apostropheMatch[1]

  return null
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
    ({ title, description, content, enclosures, published, link, itunes_episode }) => {
      const showTitle = extractShowTitle(title)
      // If year is already embedded in the show title (e.g. "Nosferatu [2024]"),
      // don't extract separately — it will render naturally in the title.
      // Otherwise, try to find it in the description.
      const yearAlreadyInTitle = /\b(19[4-9]\d|20[0-2]\d)\b/.test(showTitle)
      const year = yearAlreadyInTitle
        ? null
        : (extractYearFromDescription(description) ?? SHOW_YEAR_OVERRIDES[showTitle] ?? null)

      return {
        id: link
          .replace('https://tisthepodcast.podbean.com/e/', '')
          .replace(/\/+$/, ''),
        title: `${itunes_episode ?? 'Bonus'}: ${title}`,
        rawTitle: title,
        showTitle,
        year,
        episodeNumber: itunes_episode ? parseInt(itunes_episode, 10) : null,
        published: new Date(published),
        description,
        content,
        audio: enclosures.map((enclosure) => ({
          src: enclosure.url,
          type: enclosure.type,
        }))[0],
      }
    },
  )

  return episodes
}
