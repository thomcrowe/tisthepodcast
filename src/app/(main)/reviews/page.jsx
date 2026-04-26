import Link from 'next/link'

import { Container } from '@/components/Container'
import filmReviews from '@/data/film-reviews.json'

export const metadata = {
  title: 'Christmas Movie Reviews',
  description:
    'In-depth Christmas movie reviews from Tis the Podcast. Is it a Christmas movie? How does it rank? Anthony, Julia, and Thom have the definitive verdict.',
  openGraph: {
    title: 'Christmas Movie Reviews — Tis the Podcast',
    description:
      'In-depth Christmas movie reviews from Tis the Podcast. Is it a Christmas movie? How does it rank? Anthony, Julia, and Thom have the definitive verdict.',
  },
}

const CHRISTMAS_BADGE = {
  yes: { label: 'Christmas Movie', className: 'bg-green-100 text-green-800' },
  no: { label: 'Not a Christmas Movie', className: 'bg-red-100 text-red-800' },
  debated: { label: 'Debated', className: 'bg-yellow-100 text-yellow-800' },
}

export default function ReviewsIndex() {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <div className="mb-10">
          <h1 className="text-2xl/7 font-bold text-slate-900">
            Christmas Movie Reviews
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            In-depth reviews from Tis the Podcast — the Christmas podcast that
            watches Christmas movies year-round. Is it a Christmas movie? Is it
            worth watching? We have the definitive answer.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {filmReviews.map((film) => {
            const badge = film.isChristmasMovie
              ? CHRISTMAS_BADGE[film.isChristmasMovie]
              : null
            return (
              <Link
                key={film.slug}
                href={`/reviews/${film.slug}`}
                className="group flex items-start justify-between gap-6 py-6 hover:bg-slate-50 -mx-4 px-4 rounded-lg transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                      {film.title}
                      {film.year ? (
                        <span className="font-normal text-slate-500"> ({film.year})</span>
                      ) : null}
                    </h2>
                    {badge && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${badge.className}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  {film.verdict && (
                    <p className="text-sm text-slate-500 line-clamp-1">{film.verdict}</p>
                  )}
                  {film.genres?.length > 0 && (
                    <p className="mt-1 text-xs text-slate-400">
                      {film.genres.join(' · ')}
                    </p>
                  )}
                </div>
                <span
                  className="shrink-0 text-sm font-bold text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  Read review →
                </span>
              </Link>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

export const revalidate = 86400
