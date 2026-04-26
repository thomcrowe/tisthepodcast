import { getAllEpisodes } from '@/lib/episodes'
import filmReviews from '@/data/film-reviews.json'

const SITE_URL = 'https://tisthepodcast.com'

export default async function sitemap() {
  const episodes = await getAllEpisodes()

  const episodeUrls = episodes.map((episode) => ({
    url: `${SITE_URL}/${episode.id}`,
    lastModified: new Date(episode.published),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const reviewUrls = filmReviews.map((film) => ({
    url: `${SITE_URL}/reviews/${film.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/the-watch-list`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...reviewUrls,
    ...episodeUrls,
  ]
}
