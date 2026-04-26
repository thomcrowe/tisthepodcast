import Link from 'next/link'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://tisthepodcast.com'

export async function generateMetadata({ searchParams }) {
  const params = await searchParams
  const page = Math.max(1, Number(params?.page) || 1)
  const pageStr = page > 1 ? `?page=${page}` : ''
  return {
    alternates: {
      canonical: `${SITE_URL}/${pageStr}`,
    },
    // Paginated pages beyond page 1 should not be indexed separately
    ...(page > 1 && { robots: { index: false, follow: true } }),
  }
}

function PauseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  )
}

function PlayIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  )
}

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h3
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${episode.id}`}>{episode.title}</Link>
          </h3>
          <FormattedDate
            date={date}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <div
            className="mt-1 text-base leading-7 text-slate-700 [&>p+p]:mt-2"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <div className="mt-4 flex items-center gap-4">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm/6 font-bold text-pink-600 hover:text-pink-700 active:text-pink-900"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true">Listen</span>
                </>
              }
            />
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link
              href={`/${episode.id}`}
              className="flex items-center text-sm/6 font-bold text-pink-600 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

const EPISODES_PER_PAGE = 15

export default async function Home({ searchParams }) {
  let allEpisodes = await getAllEpisodes()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'Tis the Podcast',
    url: SITE_URL,
    description:
      'A Christmas movie podcast that reviews and ranks Christmas films, TV specials, and holiday episodes every week, year-round. Hosted by Anthony Caruso, Julia Colburn, and Thom Crowe. Keeping the Christmas spirit alive 365 days a year since 2017.',
    image: `${SITE_URL}/og-image.jpg`,
    webFeed: 'https://feed.podbean.com/tisthepodcast/feed.xml',
    startDate: '2017-08-01',
    genre: ['Christmas Movies', 'Christmas Podcast', 'Holiday Podcast'],
    keywords: 'christmas podcast, christmas movie podcast, christmas movie reviews, christmas movie rankings, holiday podcast',
    numberOfEpisodes: allEpisodes.length,
    author: [
      { '@type': 'Person', name: 'Anthony Caruso' },
      { '@type': 'Person', name: 'Julia Colburn' },
      { '@type': 'Person', name: 'Thom Crowe' },
    ],
    sameAs: [
      'https://open.spotify.com/show/1oVhOnOULzGZbRYTEBGEal',
      'https://podcasts.apple.com/us/podcast/tis-the-podcast/id1272483416',
    ],
  }

  const params = await searchParams
  const page = Math.max(1, Number(params?.page) || 1)
  const totalPages = Math.ceil(allEpisodes.length / EPISODES_PER_PAGE)
  const currentPage = Math.min(page, totalPages)
  const episodes = allEpisodes.slice(
    (currentPage - 1) * EPISODES_PER_PAGE,
    currentPage * EPISODES_PER_PAGE,
  )

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <h1 className="text-2xl/7 font-bold text-slate-900">
          Christmas Movie Podcast — All Episodes
        </h1>
      </Container>
      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        {episodes.map((episode) => (
          <EpisodeEntry key={episode.id} episode={episode} />
        ))}
      </div>
      {totalPages > 1 && (
        <Container>
          <nav
            aria-label="Episode pagination"
            className="mt-8 flex items-center justify-between border-t border-slate-100 pt-8 pb-4"
          >
            <div>
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? '/' : `/?page=${currentPage - 1}`}
                  className="text-sm font-bold text-pink-600 hover:text-pink-700"
                >
                  ← Newer episodes
                </Link>
              )}
            </div>
            <p className="text-sm text-slate-500">
              Page {currentPage} of {totalPages}
            </p>
            <div>
              {currentPage < totalPages && (
                <Link
                  href={`/?page=${currentPage + 1}`}
                  className="text-sm font-bold text-pink-600 hover:text-pink-700"
                >
                  Older episodes →
                </Link>
              )}
            </div>
          </nav>
        </Container>
      )}
    </div>
    </>
  )
}

export const revalidate = 3600
