// Machine-readable index of every episode for LLMs and answer engines
// (https://llmstxt.org). Built from the same feed as the sitemap so it never
// goes stale.
import { getEpisodesByYear } from '@/lib/episode-archive'
import { buildMetaDescription, buildSeoTitle } from '@/lib/episode-seo'
import { hubHrefForEpisode } from '@/lib/film-links'

const SITE_URL = 'https://tisthepodcast.com'

export async function GET() {
  const years = await getEpisodesByYear()
  const lines = [
    '# Tis the Podcast — full episode index',
    '',
    '> Every episode of Tis the Podcast, the year-round Christmas movie podcast hosted by Anthony Caruso, Julia Colburn, and Thom Crowe since 2017. One line per episode: title, release date, summary, and URL. See https://tisthepodcast.com/llms.txt for the site overview.',
    '',
  ]
  for (const [year, list] of years) {
    lines.push(`## ${year}`, '')
    for (const e of list) {
      const date = new Date(e.published).toISOString().slice(0, 10)
      const href = hubHrefForEpisode(e.id) ?? `/${e.id}`
      const num = e.episodeNumber ? `Episode ${e.episodeNumber}` : 'Bonus episode'
      lines.push(
        `- [${buildSeoTitle(e)}](${SITE_URL}${href}) — ${num}, ${date}. ${buildMetaDescription(e)}`,
      )
    }
    lines.push('')
  }
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

export const revalidate = 3600
