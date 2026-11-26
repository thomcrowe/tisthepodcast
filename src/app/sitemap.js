import { getAllEpisodes } from '@/lib/episodes'
import filmReviews from '@/data/film-reviews.json'
import isItChristmas from '@/data/is-it-christmas.json'
import { TV_SHOWS } from '@/data/tv-shows'
import { standaloneReviews } from '@/lib/film-links'
import { getEpisodesByYear } from '@/lib/episode-archive'

const SITE_URL = 'https://tisthepodcast.com'

// Bump this when editorial pages (lists, verdicts, reviews, TV guides,
// about) actually change. Using the build time for every page teaches
// Google to ignore lastmod.
const CONTENT_UPDATED = new Date('2026-11-24T00:00:00Z')

export default async function sitemap() {
  const episodes = await getAllEpisodes()
  const newestEpisode = new Date(
    Math.max(...episodes.map((e) => new Date(e.published).getTime())),
  )

  // Give numbered episodes slightly higher priority than bonus/unnumbered ones.
  // Use the real publish date as lastModified — Google trusts date accuracy.
  // Only canonical URLs belong in the sitemap. Episodes that have a review hub
  // declare that hub as canonical, so they're left out here.
  const reviewHubEpisodeIds = new Set(filmReviews.map((f) => f.episodeId))
  const episodeUrls = episodes
    .filter((episode) => !reviewHubEpisodeIds.has(episode.id))
    .map((episode) => ({
    url: `${SITE_URL}/${episode.id}`,
    lastModified: new Date(episode.published),
    changeFrequency: 'yearly',
    priority: episode.episodeNumber ? 0.7 : 0.5,
  }))

  // Review hubs and AEO articles are the highest-value SEO targets —
  // list them first so Googlebot encounters them early in the sitemap.
  // Reviews merged into a verdict page 301 there, so only standalone ones.
  const reviewUrls = standaloneReviews.map((film) => ({
    url: `${SITE_URL}/reviews/${film.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const isItUrls = isItChristmas.map((article) => ({
    url: `${SITE_URL}/is-it-a-christmas-movie/${article.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const showUrls = TV_SHOWS.filter((s) => s.landingPage).map((show) => ({
    url: `${SITE_URL}/christmas-episodes/${show.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const years = await getEpisodesByYear()
  const yearUrls = years.map(([year, list]) => ({
    url: `${SITE_URL}/episodes/${year}`,
    lastModified: new Date(
      Math.max(...list.map((e) => new Date(e.published).getTime())),
    ),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const all = [
    // Pillar pages first — highest crawl priority
    {
      url: SITE_URL,
      lastModified: newestEpisode,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/best-christmas-movies`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/family-christmas-movies`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/underrated-christmas-movies`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/the-watch-list`,
      lastModified: newestEpisode,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/is-it-a-christmas-movie`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/christmas-episodes`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // SEO hub pages — individual reviews and AEO articles
    ...reviewUrls,
    ...showUrls,
    ...isItUrls,
    {
      url: `${SITE_URL}/episodes`,
      lastModified: newestEpisode,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...yearUrls,
    // Supporting pages
    {
      url: `${SITE_URL}/about`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    // Episode pages last — most numerous, lowest individual priority
    ...episodeUrls,
  ]

  // Only plain-ASCII canonical URLs belong here; anything else is a bug.
  return all.filter((entry) => !/[^\x00-\x7f%]/.test(entry.url) && !entry.url.includes('%'))
}
