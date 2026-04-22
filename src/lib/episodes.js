import { parse as parseFeed } from 'rss-to-json'
import posterData from '@/data/episode-posters.json'

const FEED_URL = 'https://feed.podbean.com/tisthepodcast/feed.xml'

// Manual year overrides for early episodes whose descriptions predate the
// "the YYYY film" convention. Add entries here as needed.
const SHOW_YEAR_OVERRIDES = {
  'Elf': '2003',
  'Die Hard': '1988',
  'Home Alone': '1990',
  'Love Actually': '2003',
}

// Extra HTML appended to episode page content for SEO enrichment.
// Keyed by episode ID (Podbean slug).
const CONTENT_ADDITIONS = {
  'all-i-want-for-christmas-is-you-1534126728':
    '<p><strong>About the film:</strong> <em>Mariah Carey\'s All I Want for Christmas Is You</em> is a 2017 animated holiday film based on Mariah Carey\'s iconic 1994 Christmas song. Mariah Carey voices the lead character and serves as executive producer, bringing her beloved holiday classic to life in animated form.</p>',
  'the-christmas-chronicles-a-very-special-bonus-episode':
    '<p><strong>About the film:</strong> <em>The Christmas Chronicles</em> (2018) is a Netflix original Christmas movie starring <strong>Kurt Russell</strong> as Santa Claus, with a cameo appearance by <strong>Goldie Hawn</strong> as Mrs. Claus. Russell\'s charismatic portrayal of a rock-and-roll Santa became an instant fan favorite.</p>',
  'happy-holidays-from-everyone-except-jenna':
    '<p><strong>About the show:</strong> <em>30 Rock</em> starred <strong>Tina Fey</strong> as Liz Lemon, <strong>Alec Baldwin</strong> as Jack Donaghy, <strong>Tracy Morgan</strong> as Tracy Jordan, <strong>Jane Krakowski</strong> as Jenna Maroney, and <strong>Jack McBrayer</strong> as Kenneth Parcell. The series ran on NBC from 2006 to 2013 and is widely regarded as one of the greatest sitcoms ever made.</p>',
}

// Extract the show/movie/special title from an episode title like:
// "It Feels Like Christmas! (The Muppet Christmas Carol)"  →  "The Muppet Christmas Carol"
// "Quote... (Show Title...)"  →  "Show Title"
// "Silent Night (2023)"  →  "Silent Night"  (year-only parens stripped)
export function extractShowTitle(rawTitle) {
  const match = rawTitle.match(/\(([^)]+?)\)?\.?\s*$/)
  if (match) {
    const extracted = match[1].replace(/\.{2,}$/, '').trim()
    // If the parenthetical is just a 4-digit year (e.g. "Silent Night (2023)"),
    // the real title is everything before the parenthetical.
    if (/^(19[4-9]\d|20[0-2]\d)$/.test(extracted)) {
      return rawTitle.replace(/\s*\([^)]*\)\s*$/, '').trim()
    }
    return extracted
  }
  return rawTitle.trim()
}

function stripHtmlBasic(html) {
  return html?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() ?? ''
}

function fixVagueLinkText(html) {
  if (!html) return html
  return html.replace(
    /<a(\s[^>]*)>(here|click here|this link)<\/a>/gi,
    (match, attrs) => {
      const hrefMatch = attrs.match(/href=["']([^"']+)["']/)
      const href = hrefMatch ? hrefMatch[1] : ''
      if (href.includes('youtube.com') || href.includes('youtu.be')) {
        return `<a${attrs}>Watch on YouTube</a>`
      }
      if (href.includes('spotify.com')) {
        return `<a${attrs}>Listen on Spotify</a>`
      }
      return `<a${attrs}>View link</a>`
    },
  )
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

      // Check if the raw RSS title ends with "(YEAR)" — e.g. "Silent Night (2023)".
      // In that case the year was in the title parens and extractShowTitle already
      // stripped it, so we capture it here directly.
      const rawTitleYearMatch = title.match(/\((\d{4})\)\s*$/)

      // If year is already embedded in the show title (e.g. "Nosferatu [2024]"),
      // don't extract separately — it will render naturally in the title.
      const yearAlreadyInTitle = /\b(19[4-9]\d|20[0-2]\d)\b/.test(showTitle)

      const year = rawTitleYearMatch
        ? rawTitleYearMatch[1]
        : yearAlreadyInTitle
          ? null
          : (extractYearFromDescription(description) ?? SHOW_YEAR_OVERRIDES[showTitle] ?? null)

      const id = link
        .replace('https://tisthepodcast.podbean.com/e/', '')
        .replace(/\/+$/, '')

      const addition = CONTENT_ADDITIONS[id]
      const enrichedContent = addition ? (content ?? '') + addition : content

      return {
        id,
        title: `${itunes_episode ?? 'Bonus'}: ${title}`,
        rawTitle: title,
        showTitle,
        year,
        episodeNumber: itunes_episode ? parseInt(itunes_episode, 10) : null,
        published: new Date(published),
        description: fixVagueLinkText(description),
        content: enrichedContent,
        audio: enclosures.map((enclosure) => ({
          src: enclosure.url,
          type: enclosure.type,
        }))[0],
      }
    },
  )

  return episodes
}
