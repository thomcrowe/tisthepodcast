import { getAllEpisodes } from '@/lib/episodes'
import filmReviews from '@/data/film-reviews.json'
import isItChristmas from '@/data/is-it-christmas.json'

const SITE_URL = 'https://tisthepodcast.com'

export default async function sitemap() {
  const episodes = await getAllEpisodes()

  // Give numbered episodes slightly higher priority than bonus/unnumbered ones.
  // Use the real publish date as lastModified — Google trusts date accuracy.
  const episodeUrls = episodes.map((episode) => ({
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
    // SEO hub pages — individual reviews and AEO articles
    ...reviewUrls,
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
