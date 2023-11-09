import { parse } from 'rss-to-json'

export async function getStaticProps() {
  let feed = await parse('https://feed.podbean.com/tisthepodcast/feed.xml')

  feed.items
    .filter((episode) => undefined === episode.itunes_episode)
    .map((episode) => console.debug(episode))

  return {
    props: {
      episodes: feed.items.map(
        ({
          title,
          description,
          enclosures,
          published,
          link,
          itunes_episode,
        }) => ({
          id: link
            .replace('https://tisthepodcast.podbean.com/e/', '')
            .replace(/\/+$/, ''),
          title: `${itunes_episode ?? 'Bonus'}: ${title}`,
          published,
          description,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        })
      ),
    },
    revalidate: 10,
  }
}
