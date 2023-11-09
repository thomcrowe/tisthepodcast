import { parse } from 'rss-to-json'

export async function getStaticProps() {
  let feed = await parse('https://feeds.acast.com/public/shows/653c5387238f610012e18535')

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
            .replace('https://shows.acast.com/the-sacristy/episodes/', '')
            .replace(/\/+$/, ''),
          title: `${itunes_episode ?? ' '} ${title}`,
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
