import { cache } from 'react'
import { notFound, permanentRedirect } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { PauseIcon } from '@/components/PauseIcon'
import { PlayIcon } from '@/components/PlayIcon'
import { getAllEpisodes } from '@/lib/episodes'
import filmReviews from '@/data/film-reviews.json'
import { buildMetaDescription, buildSeoTitle } from '@/lib/episode-seo'
import { formatEpisodeCode, getShowHref, getTvCoverageForEpisode } from '@/data/tv-shows'
import { TranscriptSection, TranscriptJumpLink } from '@/components/TranscriptSection'
import { getTranscript } from '@/lib/transcripts'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/schema'

const SITE_URL = 'https://tisthepodcast.com'

// If this episode has a dedicated review hub page, return its slug
function getReviewHubSlug(episodeId) {
  const match = filmReviews.find((f) => f.episodeId === episodeId)
  return match?.slug ?? null
}

const getEpisode = cache(async (id) => {
  let allEpisodes = await getAllEpisodes()
  let episode = allEpisodes.find((episode) => episode.id === id)

  if (!episode) {
    // Older Podbean slugs were prefixed "episode-NNN-" and still get Google
    // traffic. Send them to the current slug when the rest of it matches.
    const legacy = id.match(/^episode-\d+-(.+)$/)
    if (legacy) {
      const match = allEpisodes.find(
        (e) => e.id === legacy[1] || e.id.startsWith(`${legacy[1]}-`),
      )
      if (match) permanentRedirect(`/${match.id}`)
    }
    notFound()
  }

  return episode
})

export async function generateMetadata({ params }) {
  let { episode: episodeId } = await params
  let episode = await getEpisode(episodeId)

  // SEO title built by buildSeoTitle — handles Another Christmas Story chapters specially
  const seoTitle = buildSeoTitle(episode)
  const metaDescription = buildMetaDescription(episode)
  let episodeUrl = `${SITE_URL}/${episode.id}`
  const reviewHubSlug = getReviewHubSlug(episode.id)
  const canonicalUrl = reviewHubSlug
    ? `${SITE_URL}/reviews/${reviewHubSlug}`
    : episodeUrl

  return {
    title: seoTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'music.song',
      title: seoTitle,
      description: metaDescription,
      url: episodeUrl,
      images: [{ url: '/og-image.jpg', width: 800, height: 800, alt: seoTitle }],
      audio: episode.audio?.src,
      publishedTime: new Date(episode.published).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: metaDescription,
      images: ['/og-image.jpg'],
    },
  }
}

export async function generateStaticParams() {
  let episodes = await getAllEpisodes()
  return episodes.map((episode) => ({
    episode: episode.id,
  }))
}

export default async function Episode({ params }) {
  let { episode: episodeId } = await params
  let episode = await getEpisode(episodeId)
  let date = new Date(episode.published)

  const seoTitle = buildSeoTitle(episode)
  const episodeDescription = buildMetaDescription(episode)
  const tv = getTvCoverageForEpisode(episode.id)
  const tvEpisodes = tv?.coverage.episodes ?? []
  const transcript = getTranscript(episode.id)
  const reviewHubSlug = getReviewHubSlug(episode.id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    url: `${SITE_URL}/${episode.id}`,
    name: seoTitle,
    datePublished: new Date(episode.published).toISOString(),
    description: episodeDescription,
    ...(episode.episodeNumber ? { episodeNumber: episode.episodeNumber } : {}),
    genre: 'Christmas Movies',
    ...(episode.audio?.src
      ? {
          associatedMedia: {
            '@type': 'MediaObject',
            contentUrl: episode.audio.src,
            encodingFormat: episode.audio.type || 'audio/mpeg',
          },
        }
      : {}),
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Tis the Podcast',
      url: SITE_URL,
      webFeed: 'https://feed.podbean.com/tisthepodcast/feed.xml',
    },
    ...(tv
      ? {
          about: {
            '@type': 'TVSeries',
            name: tv.show.name,
            ...(tvEpisodes.length > 0
              ? {
                  episode: tvEpisodes.map((e) => ({
                    '@type': 'TVEpisode',
                    name: e.title,
                    ...(e.episode != null && typeof e.episode === 'number' ? { episodeNumber: e.episode } : {}),
                    ...(e.season != null ? { partOfSeason: { '@type': 'TVSeason', seasonNumber: e.season } } : {}),
                    ...(e.show && e.show !== tv.show.name ? { partOfSeries: { '@type': 'TVSeries', name: e.show } } : {}),
                  })),
                }
              : {}),
          },
        }
      : {}),
  }

  const firstFaq = tv
    ? {
        '@type': 'Question',
        name: `Which ${tv.show.name} Christmas episodes does Tis the Podcast cover?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            tvEpisodes.length > 0
              ? `This episode covers ${tvEpisodes
                  .map((e) => {
                    const code = formatEpisodeCode(e)
                    return `${e.show && e.show !== tv.show.name ? `${e.show} ` : ''}"${e.title}"${code ? ` (${code})` : ''}`
                  })
                  .join(', ')}.`
              : `This episode covers the Christmas episodes of ${tv.show.name}.`,
        },
      }
    : {
        '@type': 'Question',
        name: `Is ${episode.showTitle} a Christmas movie?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Tis the Podcast covered ${episode.showTitle}${episode.year ? ` (${episode.year})` : ''} in ${episode.episodeNumber ? `Episode ${episode.episodeNumber}` : 'a bonus episode'}, with hosts Anthony Caruso, Julia Colburn, and Thom Crowe debating its merits as a Christmas movie. ${episodeDescription}`,
        },
      }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      firstFaq,
      {
        '@type': 'Question',
        name: `Where can I listen to the Tis the Podcast episode on ${tv ? `${tv.show.name}'s Christmas episodes` : episode.showTitle}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `It is available at ${SITE_URL}/${episode.id} and on Spotify, Apple Podcasts, and all major podcast platforms.`,
        },
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbLd(
          tv
            ? [
                { name: 'TV Christmas Episodes', href: '/christmas-episodes' },
                ...(tv.show.landingPage
                  ? [{ name: `${tv.show.name} Christmas Episodes`, href: `/christmas-episodes/${tv.show.slug}` }]
                  : []),
                { name: seoTitle, href: `/${episode.id}` },
              ]
            : [{ name: seoTitle, href: `/${episode.id}` }],
        )} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <EpisodePlayButton
                episode={episode}
                className="group relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-hidden"
                playing={
                  <PauseIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
                }
                paused={
                  <PlayIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
                }
              />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {seoTitle}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
          </header>

          {tvEpisodes.length > 0 && (
            <section
              aria-labelledby="episodes-covered"
              className="mt-10 max-w-3xl rounded-lg border border-slate-200 bg-slate-50 px-6 py-5"
            >
              <h2 id="episodes-covered" className="text-base font-bold text-slate-900">
                Episodes covered{tv.coverage.part ? ` — ${tv.coverage.part}` : ''}
              </h2>
              <ol className="mt-3 space-y-1.5 text-base text-slate-700">
                {tvEpisodes.map((e) => {
                  const code = formatEpisodeCode(e)
                  return (
                    <li key={`${e.show ?? ''}${e.title}`}>
                      {e.show && e.show !== tv.show.name && (
                        <span className="text-slate-500">{e.show}: </span>
                      )}
                      {code && <span className="font-mono text-sm font-bold text-slate-900">{code}</span>}
                      {code && ' — '}
                      <span>&ldquo;{e.title}&rdquo;</span>
                      {e.airYear && <span className="text-slate-500"> ({e.airYear})</span>}
                    </li>
                  )
                })}
              </ol>
              {tv.show.landingPage && (
                <p className="mt-4 text-sm">
                  <Link href={getShowHref(tv.show)} className="font-bold text-pink-600 hover:text-pink-700">
                    See every {tv.show.name} Christmas episode we&apos;ve covered →
                  </Link>
                </p>
              )}
            </section>
          )}

          {transcript && <TranscriptJumpLink />}

          <hr className="my-12 border-gray-200" />
          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
            {reviewHubSlug && (
              <Link
                href={`/reviews/${reviewHubSlug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700"
              >
                Read our full {episode.showTitle} review
                <span aria-hidden="true">→</span>
              </Link>
            )}
            <Link
              href={tv ? '/christmas-episodes' : '/the-watch-list'}
              className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700"
            >
              {tv
                ? 'Browse every TV Christmas episode we\'ve covered'
                : `See where ${episode.showTitle} ranks on our Watch List`}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <section className="prose prose-slate mt-14 mb-14 max-w-3xl">
            <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900 before:mr-3 before:h-3 before:w-1.5 before:rounded-r-full before:bg-cyan-200">About this episode</h2>
            <p>{episodeDescription}</p>
            <p>
              {tv ? (
                <>
                  Anthony Caruso, Julia Colburn, and Thom Crowe dig into the Christmas episodes of <strong>{tv.show.name}</strong>
                  {episode.episodeNumber && <> in Episode {episode.episodeNumber}</>}
                  {' '}— the history, the quotes, and whether each one earns a spot in the holiday rotation.
                </>
              ) : (
                <>
                  In this episode, Anthony Caruso, Julia Colburn, and Thom Crowe dive into <strong>{episode.showTitle}</strong>
                  {episode.year && <>{' '}<strong>({episode.year})</strong></>}
                  {episode.episodeNumber && <>, Episode {episode.episodeNumber}</>}
                  . The hosts debate whether it qualifies as a Christmas movie and discuss where it ranks on the definitive <em>Tis the Podcast</em> Watch List.
                </>
              )}
            </p>
            <p>
              <em>Tis the Podcast</em> has been reviewing Christmas movies, TV specials, and holiday episodes year-round since 2017. New episodes drop every week on all major podcast platforms, including Spotify, Apple Podcasts, and more.
            </p>
          </section>

          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          />

          {transcript && <TranscriptSection transcript={transcript} />}
        </Container>
      </article>
    </>
  )
}

export const revalidate = 3600
