import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { PauseIcon } from '@/components/PauseIcon'
import { PlayIcon } from '@/components/PlayIcon'
import { getAllEpisodes } from '@/lib/episodes'
import { TV_SHOWS, formatEpisodeCode, getShowBySlug } from '@/data/tv-shows'

const SITE_URL = 'https://tisthepodcast.com'

function pageTitle(show) {
  return `${show.name} ${show.holiday} Episodes${show.complete ? ' (Full List)' : ''}`
}

function countEpisodes(show) {
  return show.coverage.reduce((n, c) => n + c.episodes.length, 0)
}

export async function generateStaticParams() {
  return TV_SHOWS.filter((s) => s.landingPage).map((s) => ({ show: s.slug }))
}

export async function generateMetadata({ params }) {
  const { show: slug } = await params
  const show = getShowBySlug(slug)
  if (!show || !show.landingPage) return {}

  const title = pageTitle(show)
  const n = countEpisodes(show)
  const description = `${show.complete ? 'Every' : 'The'} ${show.name} Christmas episode${show.complete ? '' : 's'} we've covered${n ? `, with season and episode numbers` : ''}, plus the ${show.coverage.length} Tis the Podcast episodes where we review them.`.slice(0, 155)
  const url = `${SITE_URL}/christmas-episodes/${show.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  }
}

export default async function ShowChristmasEpisodesPage({ params }) {
  const { show: slug } = await params
  const show = getShowBySlug(slug)
  if (!show) notFound()
  // Shows covered in a single podcast episode use that episode page as the
  // canonical list, so this URL forwards there permanently.
  if (!show.landingPage) permanentRedirect(`/${show.coverage[0].id}`)

  const allEpisodes = await getAllEpisodes()
  const byId = new Map(allEpisodes.map((e) => [e.id, e]))
  const url = `${SITE_URL}/christmas-episodes/${show.slug}`

  let position = 0
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${show.name} Christmas Episodes`,
    url,
    itemListElement: show.coverage.flatMap((cov) =>
      (cov.episodes.length > 0
        ? cov.episodes
        : [{ title: byId.get(cov.id)?.rawTitle ?? show.name }]
      ).map((e) => {
        const code = formatEpisodeCode(e)
        return {
          '@type': 'ListItem',
          position: ++position,
          name: `${code ? `${code} ` : ''}${e.title}`,
          url: `${SITE_URL}/${cov.id}`,
        }
      }),
    ),
  }
  itemListLd.numberOfItems = position

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <article className="py-16 lg:py-36">
        <Container>
          <header className="mb-10">
            <p className="mb-2 font-mono text-sm text-slate-500">
              <Link href="/christmas-episodes" className="hover:text-pink-600">
                TV Christmas Episodes
              </Link>{' '}
              · Tis the Podcast
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              {show.name} {show.holiday} Episodes
            </h1>
            {show.intro && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{show.intro}</p>
            )}
          </header>

          <div className="space-y-12">
            {show.coverage.map((cov) => {
              const ep = byId.get(cov.id)
              return (
                <section key={cov.id} className="max-w-3xl">
                  {cov.part && (
                    <h2 className="text-xl font-bold text-slate-900">{cov.part}</h2>
                  )}
                  {cov.episodes.length > 0 ? (
                    <ol className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-200">
                      {cov.episodes.map((e) => {
                        const code = formatEpisodeCode(e)
                        return (
                          <li key={e.title} className="flex flex-wrap items-baseline gap-x-3 px-5 py-3">
                            {code && (
                              <span className="w-24 shrink-0 font-mono text-sm font-bold text-slate-900">{code}</span>
                            )}
                            <span className="text-base text-slate-800">&ldquo;{e.title}&rdquo;</span>
                            {e.airYear && <span className="text-sm text-slate-500">({e.airYear})</span>}
                          </li>
                        )
                      })}
                    </ol>
                  ) : (
                    <p className="mt-3 text-slate-600">
                      The episode list for this one isn&apos;t in our show notes yet — listen to hear which episodes we covered.
                    </p>
                  )}
                  {ep && (
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      <EpisodePlayButton
                        episode={ep}
                        className="flex items-center gap-x-2 font-bold text-pink-600 hover:text-pink-700"
                        playing={<><PauseIcon className="h-2.5 w-2.5 fill-current" /><span>Pause</span></>}
                        paused={<><PlayIcon className="h-2.5 w-2.5 fill-current" /><span>Listen</span></>}
                      />
                      <span aria-hidden="true" className="text-slate-300">/</span>
                      <Link href={`/${cov.id}`} className="font-bold text-pink-600 hover:text-pink-700">
                        Show notes{ep.episodeNumber ? ` for Episode ${ep.episodeNumber}` : ''} →
                      </Link>
                    </div>
                  )}
                </section>
              )
            })}
          </div>

          <div className="mt-16 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
            <Link href="/christmas-episodes" className="font-bold text-pink-600 hover:text-pink-700">
              More TV Christmas episodes we&apos;ve covered →
            </Link>
          </div>
        </Container>
      </article>
    </>
  )
}

export const revalidate = 86400
