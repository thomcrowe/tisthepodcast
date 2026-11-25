import { getAllEpisodes } from '@/lib/episodes'
import filmReviews from '@/data/film-reviews.json'
import isItChristmas from '@/data/is-it-christmas.json'
import { TV_SHOWS } from '@/data/tv-shows'

const SITE_URL = 'https://tisthepodcast.com'

export default async function sitemap() {
  const episodes = await getAllEpisodes()

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
  const reviewUrls = filmReviews.map((film) => ({
    url: `${SITE_URL}/reviews/${film.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const isItUrls = isItChristmas.map((article) => ({
    url: `${SITE_URL}/is-it-a-christmas-movie/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const showUrls = TV_SHOWS.filter((s) => s.landingPage).map((show) => ({
    url: `${SITE_URL}/christmas-episodes/${show.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    // Pillar pages first — highest crawl priority
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/best-christmas-movies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/family-christmas-movies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/underrated-christmas-movies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/the-watch-list`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/is-it-a-christmas-movie`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/christmas-episodes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // SEO hub pages — individual reviews and AEO articles
    ...reviewUrls,
    ...showUrls,
    ...isItUrls,
    // Supporting pages
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    // Episode pages last — most numerous, lowest individual priority
    ...episodeUrls,
  ]
}
