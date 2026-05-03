import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { PauseIcon } from '@/components/PauseIcon'
import { PlayIcon } from '@/components/PlayIcon'
import { getAllEpisodes } from '@/lib/episodes'
import filmReviews from '@/data/film-reviews.json'

const SITE_URL = 'https://tisthepodcast.com'

// If this episode has a dedicated review hub page, return its slug
function getReviewHubSlug(episodeId) {
  const match = filmReviews.find((f) => f.episodeId === episodeId)
  return match?.slug ?? null
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() ?? ''
}

// Extract first 200 chars of plain text from HTML (for "About this episode" section)
function stripHtmlDescription(html) {
  const plain = stripHtml(html)
  return plain.length > 200 ? plain.slice(0, 200).trim() + '…' : plain
}

// Build an engaging meta description: find a clean sentence boundary near 155 chars.
// Falls back to a synthetic description if the RSS content is missing or too short.
function buildMetaDescription(episode) {
  const plain = stripHtml(episode.description)

  if (plain && plain.length >= 50) {
    if (plain.length <= 155) return plain

    // Try to break at a sentence end within 155 chars
    const chunk = plain.slice(0, 155)
    const sentenceEnd = Math.max(
      chunk.lastIndexOf('. '),
      chunk.lastIndexOf('! '),
      chunk.lastIndexOf('? '),
    )
    if (sentenceEnd > 80) return plain.slice(0, sentenceEnd + 1)

    // Fall back to word boundary
    const wordEnd = chunk.lastIndexOf(' ')
    return plain.slice(0, wordEnd > 0 ? wordEnd : 155) + '…'
  }

  // Synthetic fallback for episodes with empty or very short RSS descriptions
  const year = episode.year ? ` (${episode.year})` : ''
  const epLabel = episode.episodeNumber
    ? `Episode ${episode.episodeNumber}`
    : 'a bonus episode'
  return `Tis the Podcast covers ${episode.showTitle}${year} in ${epLabel}. Anthony Caruso, Julia Colburn, and Thom Crowe debate whether it qualifies as a Christmas movie and where it ranks on the definitive Watch List.`
}

// Build an SEO-friendly title for an episode.
// "Another Christmas Story" chapters get a cleaner format; everything else gets "Review".
function buildSeoTitle(episode) {
  // Detect Another Christmas Story chapters by ID prefix
  if (episode.id?.startsWith('another-christmas-story')) {
    // Pull the carol/song title out: everything after the last " - " or "- "
    const rawTitle = episode.rawTitle ?? episode.showTitle
    const dashMatch = rawTitle.match(/-\s+(.+?)(?:\s+as read by.+)?$/i)
    const chapterTitle = dashMatch?.[1]?.trim() ?? episode.showTitle
    return `${chapterTitle} | Another Christmas Story`
  }

  return episode.year
    ? `${episode.showTitle} (${episode.year}) Review`
    : `${episode.showTitle} Review`
}

const getEpisode = cache(async (id) => {
  let allEpisodes = await getAllEpisodes()
  let episode = allEpisodes.find((episode) => episode.id === id)

  if (!episode) {
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
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: seoTitle }],
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    url: `${SITE_URL}/${episode.id}`,
    name: seoTitle,
    datePublished: new Date(episode.published).toISOString(),
    description: episodeDescription,
    episodeNumber: episode.episodeNumber ?? undefined,
    genre: 'Christmas Movies',
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: episode.audio?.src,
      encodingFormat: episode.audio?.type,
    },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Tis the Podcast',
      url: SITE_URL,
    },
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${episode.showTitle} a Christmas movie?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Tis the Podcast covered ${episode.showTitle}${episode.year ? ` (${episode.year})` : ''} in Episode ${episode.episodeNumber ?? 'Bonus'}, with hosts Anthony Caruso, Julia Colburn, and Thom Crowe debating its merits as a Christmas movie. ${episodeDescription}`,
        },
      },
      {
        '@type': 'Question',
        name: `What do the hosts of Tis the Podcast think of ${episode.showTitle}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: episodeDescription
            ? `${episodeDescription} Listen to the full episode at tisthepodcast.com.`
            : `Anthony Caruso, Julia Colburn, and Thom Crowe reviewed ${episode.showTitle} on Tis the Podcast. Listen at tisthepodcast.com.`,
        },
      },
      {
        '@type': 'Question',
        name: `Where can I listen to the Tis the Podcast review of ${episode.showTitle}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The Tis the Podcast review of ${episode.showTitle} is available at ${SITE_URL}/${episode.id} and on Spotify, Apple Podcasts, and all major podcast platforms. Tis the Podcast is the leading Christmas podcast dedicated to reviewing Christmas movies year-round.`,
        },
      },
    ],
  }

  return (
    <>
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
          <hr className="my-12 border-gray-200" />
          <div className="mb-10">
            <Link
              href="/the-watch-list"
              className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700"
            >
              See where {episode.showTitle} ranks on our Watch List
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <section className="prose prose-slate mt-14 mb-14 max-w-3xl">
            <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900 before:mr-3 before:h-3 before:w-1.5 before:rounded-r-full before:bg-cyan-200">About this episode</h2>
            <p>
              In this episode, Anthony Caruso, Julia Colburn, and Thom Crowe dive into <strong>{episode.showTitle}</strong>
              {episode.year && <>{' '}<strong>({episode.year})</strong></>}
              {episode.episodeNumber && <>, Episode {episode.episodeNumber}</>}
              . The hosts debate whether it qualifies as a Christmas movie and discuss where it ranks on the definitive <em>Tis the Podcast</em> Watch List.
            </p>
            {episode.description && episode.description.length > 0 && (
              <p>{stripHtmlDescription(episode.description)}</p>
            )}
            <p>
              <em>Tis the Podcast</em> has been reviewing Christmas movies, TV specials, and holiday episodes year-round since 2017. New episodes drop every week on all major podcast platforms, including Spotify, Apple Podcasts, and more.
            </p>
          </section>

          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          />
        </Container>
      </article>
    </>
  )
}

export const revalidate = 3600
