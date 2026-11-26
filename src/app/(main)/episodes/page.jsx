import Link from 'next/link'

import { Container } from '@/components/Container'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/schema'
import { getEpisodesByYear } from '@/lib/episode-archive'

const SITE_URL = 'https://tisthepodcast.com'
const description =
  'Every Tis the Podcast episode since August 2017, organized by year: Christmas movie reviews, TV Christmas episodes, bonus episodes, and Halloween specials.'

export const metadata = {
  title: 'Every Episode, by Year (2017–Today)',
  description,
  alternates: { canonical: `${SITE_URL}/episodes` },
  openGraph: {
    type: 'website',
    title: 'Every Tis the Podcast Episode, by Year',
    description,
    url: `${SITE_URL}/episodes`,
    images: [{ url: '/og-image.jpg', width: 800, height: 800, alt: 'Tis the Podcast episode archive' }],
  },
}

export default async function EpisodesArchive() {
  const years = await getEpisodesByYear()
  const total = years.reduce((n, [, list]) => n + list.length, 0)

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'All Episodes', href: '/episodes' }])} />
      <div className="py-16 lg:py-24">
        <Container>
          <h1 className="text-3xl font-bold text-slate-900">Every Episode, by Year</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            {total} episodes since August 2017. Pick a year to see every Christmas movie, TV
            Christmas episode, and bonus episode we released that year.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {years.map(([year, list]) => (
              <li key={year}>
                <Link
                  href={`/episodes/${year}`}
                  className="block rounded-lg border border-slate-200 px-5 py-4 hover:border-pink-300"
                >
                  <span className="text-xl font-bold text-slate-900">{year}</span>
                  <span className="ml-3 text-sm text-slate-500">{list.length} episodes</span>
                  <span className="mt-1 block truncate text-sm text-slate-600">
                    {list
                      .slice(0, 4)
                      .map((e) => e.showTitle)
                      .join(', ')}
                    …
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  )
}

export const revalidate = 3600
