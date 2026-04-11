import { parse as parseFeed } from 'rss-to-json'

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
