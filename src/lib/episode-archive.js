// Year-by-year episode archive. Replaces the 20+-page /page/N chain as the
// crawl path to old episodes: home → /episodes → /episodes/<year> → episode.
import { getAllEpisodes } from '@/lib/episodes'

export async function getEpisodesByYear() {
  const episodes = await getAllEpisodes()
  const byYear = new Map()
  for (const e of episodes) {
    const y = new Date(e.published).getUTCFullYear()
    if (!byYear.has(y)) byYear.set(y, [])
    byYear.get(y).push(e)
  }
  for (const list of byYear.values()) {
    list.sort((a, b) => new Date(a.published) - new Date(b.published))
  }
  return [...byYear.entries()].sort((a, b) => b[0] - a[0])
}
