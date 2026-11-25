import Link from 'next/link'

import { Container } from '@/components/Container'
import { TV_SHOWS, getShowHref } from '@/data/tv-shows'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/schema'

const SITE_URL = 'https://tisthepodcast.com'

const description =
  "Every TV show whose Christmas episodes Tis the Podcast has covered, from The Nanny and Fresh Prince to Home Improvement and The Office, with episode lists."

export const metadata = {
  title: "TV Christmas Episodes: Every Show We've Covered",
  description,
  alternates: { canonical: `${SITE_URL}/christmas-episodes` },
  openGraph: {
    type: 'website',
    title: "TV Christmas Episodes: Every Show We've Covered",
    description,
    url: `${SITE_URL}/christmas-episodes`,
    images: [{ url: '/og-image.jpg', width: 800, height: 800, alt: 'TV Christmas Episodes — Tis the Podcast' }],
  },
}

const sortName = (n) => n.replace(/^The /, '')
const shows = [...TV_SHOWS].sort((a, b) => sortName(a.name).localeCompare(sortName(b.name)))

function count(show) {
  return show.coverage.reduce((n, c) => n + c.episodes.length, 0)
}

export default function ChristmasEpisodesHub() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TV Christmas Episodes Covered by Tis the Podcast',
    url: `${SITE_URL}/christmas-episodes`,
    numberOfItems: shows.length,
    itemListElement: shows.map((show, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${show.name} ${show.holiday} Episodes`,
      url: `${SITE_URL}${getShowHref(show)}`,
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'TV Christmas Episodes', href: '/christmas-episodes' }])} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl/7 font-bold text-slate-900">TV Christmas Episodes</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Sitcoms, cartoons, and dramas all do Christmas eventually. These are the
            {' '}{shows.length} shows whose holiday episodes we&apos;ve covered on the podcast —
            each with the season and episode numbers, and the episode where we talk about them.
          </p>
          <ul className="mt-8 divide-y divide-slate-100">
            {shows.map((show) => {
              const n = count(show)
              return (
                <li key={show.slug}>
                  <Link
                    href={getShowHref(show)}
                    className="group -mx-4 flex items-baseline justify-between gap-6 rounded-lg px-4 py-4 hover:bg-slate-50"
                  >
                    <span className="font-bold text-slate-900 group-hover:text-pink-600">
                      {show.name} {show.holiday} Episodes
                    </span>
                    <span className="shrink-0 text-sm text-slate-500">
                      {n > 0 ? `${n} episode${n === 1 ? '' : 's'}` : 'Listen'}
                      {show.coverage.length > 1 ? ` · ${show.coverage.length} podcast episodes` : ''}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </div>
    </>
  )
}

export const revalidate = 86400
