import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd, SERIES_ID } from '@/lib/schema'
import { getEpisodesByYear } from '@/lib/episode-archive'
import { buildSeoTitle } from '@/lib/episode-seo'

const SITE_URL = 'https://tisthepodcast.com'

async function getYear(year) {
  const years = await getEpisodesByYear()
  const entry = years.find(([y]) => String(y) === String(year))
  return { list: entry?.[1] ?? null, years: years.map(([y]) => y) }
}

export async function generateStaticParams() {
  const years = await getEpisodesByYear()
  return years.map(([year]) => ({ year: String(year) }))
}

export async function generateMetadata({ params }) {
  const { year } = await params
  const { list } = await getYear(year)
  if (!list) return {}
  const sample = [...new Set(list.map((e) => e.showTitle))].slice(0, 3).join(', ')
  const title = `${year} Episodes: Every Christmas Movie We Covered`
  const description = `All ${list.length} Tis the Podcast episodes from ${year}, including ${sample}, with links to listen and read the show notes.`
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/episodes/${year}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${SITE_URL}/episodes/${year}`,
      images: [{ url: '/og-image.jpg', width: 800, height: 800, alt: title }],
    },
  }
}

export default async function EpisodesYear({ params }) {
  const { year } = await params
  const { list, years } = await getYear(year)
  if (!list) notFound()

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Tis the Podcast episodes from ${year}`,
    url: `${SITE_URL}/episodes/${year}`,
    isPartOf: { '@id': SERIES_ID },
    numberOfItems: list.length,
    itemListElement: list.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${e.id}`,
      name: buildSeoTitle(e),
    })),
  }

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'All Episodes', href: '/episodes' },
          { name: `${year} Episodes`, href: `/episodes/${year}` },
        ])}
      />
      <JsonLd data={itemListLd} />
      <div className="py-16 lg:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-slate-500">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span aria-hidden="true"> › </span>
            <Link href="/episodes" className="hover:text-pink-600">Episodes</Link>
          </nav>
          <h1 className="text-3xl font-bold text-slate-900">Tis the Podcast Episodes from {year}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            {list.length} episodes released in {year}, oldest first.
          </p>
          <ol className="mt-10 divide-y divide-slate-100 border-y border-slate-100">
            {list.map((e) => (
              <li key={e.id} className="py-4">
                <FormattedDate
                  date={new Date(e.published)}
                  className="font-mono text-xs text-slate-500"
                />
                <Link
                  href={`/${e.id}`}
                  className="mt-1 block font-semibold text-slate-900 hover:text-pink-600"
                >
                  {e.episodeNumber ? `${e.episodeNumber}: ` : 'Bonus: '}
                  {buildSeoTitle(e)}
                </Link>
              </li>
            ))}
          </ol>
          <nav aria-label="Other years" className="mt-10 flex flex-wrap gap-2">
            {years.map((y) => (
              <Link
                key={y}
                href={`/episodes/${y}`}
                aria-current={String(y) === String(year) ? 'page' : undefined}
                className={`rounded-full border px-3 py-1 text-sm ${
                  String(y) === String(year)
                    ? 'border-pink-300 font-bold text-pink-600'
                    : 'border-slate-200 text-slate-600 hover:border-pink-300'
                }`}
              >
                {y}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </>
  )
}

export const revalidate = 3600
