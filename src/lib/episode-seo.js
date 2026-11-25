// Titles and meta descriptions for podcast-episode pages.
//
// Descriptions are generated from the RSS show notes with the greeting
// boilerplate ("Happy Monday, Christmas Fanatics! …") skipped, and can be
// overridden per episode below. Overrides use only facts from that episode's
// show notes.

import { formatEpisodeCode, getTvCoverageForEpisode } from '@/data/tv-shows'

const MAX_DESC = 155

// Hand-written descriptions for the priority pages. Keep each ≤155 chars.
export const DESCRIPTION_OVERRIDES = {
  'oy-to-the-world-the-nanny-chrismukkah-episodes':
    'Every Nanny Christmas & Hanukkah episode: S1E7, S3E14 "Oy to the World" and S6E10 "The Hanukkah Story" — broken down with Santa Claus himself as our guest.',
  'fresh-prince':
    'Every Fresh Prince of Bel-Air Christmas episode: "Deck the Halls" (S1E5), "Christmas Show" (S2E12) and "\'Twas the Night Before Christening" (S4E14).',
  'happy-human-holiday-dad-rick-and-morty-christmas-episodes':
    "All three Rick and Morty Christmas episodes — Anatomy Park, Rattlestar Ricklactica and Rickmas Mortcation — reviewed and ranked. Adults only, Morty.",
  'jingle-bells-batmansmells-robinlaidan-egg-the-batmobile-lost-a-wheelandthe-jokergot-awaythechristmasepisodes-of-batmantheanimated-seriesandjustice':
    'Batman: The Animated Series Christmas episodes "Christmas with the Joker" and "A Bullet for Bullock," plus "Holiday Knights" and "Comfort and Joy."',
  'me-in-a-santa-suit-i-dont-think-so-last-man-standing-first-four-christmas-episodes':
    'Last Man Standing\'s first four Christmas episodes (Seasons 1–4), from "Last Christmas Standing" to "Elfie." Does Mike Baxter\'s Christmas hold up?',
  'ryan-just-admitted-he-was-wrong-its-a-christmas-miracle-last-man-standing-pt-2':
    'The final three Last Man Standing Christmas episodes, from "The Gift of the Wise Man" to "The Gift of the Mike Guy": laughs, hot takes and cast changes.',
  'ah-but-tim-the-spirit-of-santa-lives-on-he-lives-in-all-of-us':
    'Home Improvement\'s first three Christmas episodes: "Yule Better Watch Out," "I\'m Scheming of a White Christmas" and "A Frozen Moment." Does it hold up?',
  'i-remembermy-firstchristmasrebellioni-was-somadmy-parentswentoutand-boughtan-artificialtreethewholechristmasi-refusedto-singoh-tannenbaum':
    'Home Improvement Christmas episodes, part two: "\'Twas the Blight Before Christmas," "Some Like it Hot Rod" and "\'Twas the Night Before Chaos."',
  'what-is-a-clown-doing-next-to-baby-jesus-home-improvement':
    'The last Home Improvement Christmas episodes: "\'Twas the Flight Before Christmas," "Bright Christmas" and "Home for the Holidays" (Seasons 5, 7, 8).',
  'and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most':
    "Is 2018's animated Dr. Seuss' The Grinch worth a rewatch? After an all-out war over the Grinch last time, the elves return to Whoville for the remake.",
  'christmas-is-all-around':
    'Love Actually, reviewed: the elves hop across the pond to break down all eight storylines, the characters, and the movie as a whole.',
  'youre-a-mean-one-mr-grinch':
    "How the Grinch Stole Christmas, 1966 vs. 2000: our first battle royale. Which version wins, and how do both stack up against Dr. Seuss' book?",
}

function stripHtml(html) {
  return (
    html
      ?.replace(/<\/?(p|br|li|ul|ol|div|h\d)[^>]*>/gi, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
      .replace(/&ldquo;|&rdquo;/g, '"')
      .replace(/\s+/g, ' ')
      .trim() ?? ''
  )
}

// Remove emoji and tidy the `" Show Title "` spacing Podbean's editor leaves.
function tidy(text) {
  return text
    .replace(/\s*\([^)]{0,120}\)/g, '')
    .replace(/\bJulia, Thom,? and Anthony\b|\bThom, Julia,? and Anthony\b|\bAnthony, Julia,? and Thom\b|\bJulia, Anthony,? and Thom\b|\bAnthony, Thom,? and Julia\b|\bThom, Anthony,? and Julia\b/g, 'the hosts')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/(["“])\s+([^"”]+?)\s+(["”])/g, '$1$2$3')
    .replace(/\s+([,!?.:;])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

const GREETING =
  /^(happy|merry|welcome|greetings|we hope|hope|can you believe|apologies|sorry|join the jolliest|"?reunited|and happy|to all|it's may|firstly|secondly|we are \*?\s*back|we're back|happy \w+ day)/i

const SUBSTANCE =
  /\b(this week|in this episode|this episode|today|discuss|cover|covering|tackle|talk|review|dive|delve|join)\b/i

const ABBREV = /\b(Mr|Mrs|Ms|Dr|St|Jr|Sr|vs|Vol|No)\.(?=\s|[A-Z])/g

function splitSentences(text) {
  const guarded = text.replace(ABBREV, '$1\u2024').replace(/\b([A-Z])\.(?=[A-Z]\.)/g, '$1\u2024')
  return (
    guarded
      .match(/[^.!?]+(?:[.!?]+["”']?|$)/g)
      ?.map((s) => s.trim().replace(/\u2024/g, '.'))
      .filter(Boolean) ?? []
  )
}

function clip(text, max = MAX_DESC) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 80 ? lastSpace : max - 1).replace(/[,;:\-–—\s]+$/, '') + '…'
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function quoteList(episodes, max = 3) {
  return episodes
    .slice(0, max)
    .map((e) => {
      const code = formatEpisodeCode(e)
      return code ? `"${e.title}" (${code})` : `"${e.title}"`
    })
    .join(', ')
}

export function buildMetaDescription(episode) {
  const override = DESCRIPTION_OVERRIDES[episode.id]
  if (override) return override

  const tv = getTvCoverageForEpisode(episode.id)
  if (tv && tv.coverage.episodes.length > 0) {
    const { show, coverage } = tv
    const eps = coverage.episodes
    if (eps.length === 1) {
      const code = formatEpisodeCode(eps[0])
      return clip(
        `${show.name}'s Christmas episode "${eps[0].title}"${code ? ` (${code})` : ''}, reviewed by Tis the Podcast: is it festive enough to make the holiday rotation?`,
      )
    }
    const lead = coverage.part
      ? `${show.name} Christmas episodes, ${coverage.part.charAt(0).toLowerCase()}${coverage.part.slice(1)}: `
      : show.complete && show.coverage.length === 1
        ? `Every ${show.name} ${show.holiday} episode: `
        : `${show.name} ${show.holiday} episodes we covered: `
    return clip(`${lead}${quoteList(eps, eps.length > 3 ? 2 : 3)}${eps.length > 3 ? ' and more' : ''}, reviewed.`)
  }

  const plain = tidy(stripHtml(episode.description))
  const sentences = splitSentences(plain)
  const showName = tv ? `${tv.show.name} Christmas episodes` : episode.showTitle
  const show = normalize(tv ? tv.show.name : episode.showTitle)

  // First non-greeting sentence that names the show/movie or clearly
  // describes what the episode covers.
  let pick = sentences.find(
    (s) => !GREETING.test(s) && (normalize(s).includes(show) || SUBSTANCE.test(s)),
  )
  if (!pick) pick = sentences.find((s) => !GREETING.test(s))

  if (pick) {
    let text = pick
      .replace(/^(this week|in this episode|today|this episode)\s*,?\s*(on\s+"?tis the podcast"?,?\s*)?/i, '')
      .replace(/^[a-z]/, (c) => c.toUpperCase())
    if (!normalize(text).includes(show) && showName) {
      text = `${showName}: ${text}`
    }
    if (text.length < 105) {
      const next = sentences[sentences.indexOf(pick) + 1]
      if (next && !GREETING.test(next) && text.length + next.length + 1 <= MAX_DESC) {
        text = `${text} ${next}`
      }
    }
    if (text.length >= 50) return clip(text)
  }

  // Synthetic fallback for episodes with empty or very short notes
  const year = episode.year ? ` (${episode.year})` : ''
  return clip(
    `Tis the Podcast reviews ${episode.showTitle}${year}: Anthony Caruso, Julia Colburn and Thom Crowe debate whether it belongs in your Christmas rotation.`,
  )
}

// Hand-written titles where the generated one is unwieldy.
export const TITLE_OVERRIDES = {
  'youre-a-mean-one-mr-grinch': 'How the Grinch Stole Christmas: 1966 vs. 2000 Review',
}

// Title used for both <title> (before the " | Tis the Podcast" template)
// and the on-page H1.
export function buildSeoTitle(episode) {
  if (TITLE_OVERRIDES[episode.id]) return TITLE_OVERRIDES[episode.id]

  if (episode.id?.startsWith('another-christmas-story')) {
    const rawTitle = episode.rawTitle ?? episode.showTitle
    const dashMatch = rawTitle.match(/-\s+(.+?)(?:\s+as read by.+)?$/i)
    const chapterTitle = dashMatch?.[1]?.trim() ?? episode.showTitle
    return `${chapterTitle} | Another Christmas Story`
  }

  const tv = getTvCoverageForEpisode(episode.id)
  if (tv) {
    const { show, coverage } = tv
    const eps = coverage.episodes
    if (coverage.title) return coverage.title
    if (eps.length === 1) {
      const code = formatEpisodeCode(eps[0])
      return `${eps[0].show ?? show.name} Christmas Episode: "${eps[0].title}"${code ? ` (${code})` : ''}`
    }
    if (show.coverage.length > 1 && coverage.part) {
      const short = coverage.part.split(':')[0].replace(/^The /, '')
      return `${show.name} Christmas Episodes, ${short}`
    }
    const fullList = show.complete && show.coverage.length === 1
    return `${show.name} ${show.holiday} Episodes${fullList ? ' (Full List)' : ''}`
  }

  // "Nosferatu [2024]" → "Nosferatu (2024)"
  const show = episode.showTitle.replace(/\s*\[(\d{4})\]/g, ' ($1)')
  return episode.year ? `${show} (${episode.year}) Review` : `${show} Review`
}
