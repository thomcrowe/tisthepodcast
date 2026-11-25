import Link from 'next/link'

import { Container } from '@/components/Container'
import { getAllEpisodesForList, getPosterFromData } from '@/lib/episodes'
import { buildMetaDescription } from '@/lib/episode-seo'
import { ListCrossLinks } from '@/components/FilmTake'
import { WatchListGrid } from '@/components/WatchListGrid'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/schema'

export const metadata = {
  title: "Christmas Movie Watch List 2026: Everything We've Covered",
  description:
    'Every Christmas movie, TV special and holiday episode Tis the Podcast has covered since 2017, updated for 2026, with our take and a link to each episode.',
  alternates: {
    canonical: 'https://tisthepodcast.com/the-watch-list',
  },
  openGraph: {
    title: 'Christmas Movie Watch List 2026 — Tis the Podcast',
    description:
      'Every Christmas movie, TV special and holiday episode Tis the Podcast has covered since 2017, updated for 2026, with our take and a link to each episode.',
    url: 'https://tisthepodcast.com/the-watch-list',
    images: [{ url: '/og-image.jpg', width: 800, height: 800, alt: 'Tis the Podcast' }],
  },
}

// Revalidate once a day so new episodes appear automatically
export const revalidate = 86400


const SITE_URL = 'https://tisthepodcast.com'

export default async function TheWatchListPage() {
  const episodes = await getAllEpisodesForList()
  const items = episodes.map((ep) => ({
    ...ep,
    poster: getPosterFromData(ep.episodeNumber),
    take: buildMetaDescription({ id: ep.id, showTitle: ep.showTitle, description: ep.description, year: null }),
  }))

  // Latest episode date for "Last updated" freshness signal
  const latestDate = items.reduce((latest, item) => {
    const d = new Date(item.published)
    return d > latest ? d : latest
  }, new Date(0))

  const lastUpdated = latestDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Christmas Movie Watch List — Tis the Podcast',
    description: `Every Christmas movie, TV special, and holiday episode reviewed on Tis the Podcast since 2017. ${items.length} films reviewed.`,
    url: `${SITE_URL}/the-watch-list`,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.episodeNumber,
      name: item.showTitle,
      url: `${SITE_URL}/${item.id}`,
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'The Watch List', href: '/the-watch-list' }])} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl/7 font-bold text-slate-900">
            The Christmas Movie Watch List: Everything We&apos;ve Covered (2026)
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Since 2017, Anthony, Julia, and Thom have reviewed Christmas movies,
            TV specials, and holiday episodes every single week — year-round.
            This is the living record of everything we&apos;ve watched and debated:{' '}
            <strong>{items.length} titles</strong> and counting. Use it as your
            Christmas movie guide, your watchlist, or your ammunition the next
            time someone argues Die Hard isn&apos;t a Christmas movie.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Last updated: {lastUpdated}
          </p>
        </div>
      </Container>

      <Container>
        <WatchListGrid
          items={items.map((i) => [i.id, i.showTitle, i.episodeNumber, i.poster, i.take])}
        />
        <ListCrossLinks current="/the-watch-list" />
      </Container>
    </div>
    </>
  )
}
