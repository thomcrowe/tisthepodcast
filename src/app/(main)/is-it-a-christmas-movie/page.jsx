import Link from 'next/link'

import { Container } from '@/components/Container'
import articles from '@/data/is-it-christmas.json'

export const metadata = {
  title: 'Is It a Christmas Movie? — The Definitive Verdicts',
  description:
    'The definitive answer to the great Christmas movie debates — Is Die Hard a Christmas Movie? Is Love Actually? Tis the Podcast has the verdict on every film.',
  openGraph: {
    title: 'Is It a Christmas Movie? — Tis the Podcast',
    description:
      'The definitive answer to the great Christmas movie debates — Is Die Hard a Christmas Movie? Is Love Actually? Tis the Podcast has the verdict on every film.',
  },
}

const VERDICT_STYLES = {
  yes: { label: 'Yes', className: 'bg-green-100 text-green-800' },
  no: { label: 'No', className: 'bg-red-100 text-red-800' },
  debated: { label: 'Debated', className: 'bg-yellow-100 text-yellow-800' },
}

export default function IsItAChristmasMovieIndex() {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <div className="mb-10">
          <h1 className="text-2xl/7 font-bold text-slate-900">
            Is It a Christmas Movie?
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            The most important question in cinema. Anthony, Julia, and Thom have
            debated these films in full — here are the definitive verdicts from
            the Christmas podcast that watches Christmas movies year-round.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {articles.map((article) => {
            const verdict = VERDICT_STYLES[article.verdict]
            return (
              <Link
                key={article.slug}
                href={`/is-it-a-christmas-movie/${article.slug}`}
                className="group flex items-start justify-between gap-6 py-6 hover:bg-slate-50 -mx-4 px-4 rounded-lg transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                      Is {article.film} a Christmas Movie?
                    </h2>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${verdict.className}`}>
                      {verdict.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {article.verdictStatement}
                  </p>
                </div>
                <span
                  className="shrink-0 text-sm font-bold text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  See verdict →
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
