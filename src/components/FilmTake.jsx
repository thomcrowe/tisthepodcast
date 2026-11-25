import Link from 'next/link'

import { LIST_PAGES, LIST_TAKES, VERDICT_SLUGS } from '@/data/list-takes'

// One or two sentences of our take, sourced from the episode's show notes,
// with links to the episode and (where one exists) the verdict page.
export function FilmTake({ film }) {
  const take = film.episodeId ? LIST_TAKES[film.episodeId] : null
  const verdictSlug = VERDICT_SLUGS[film.title]
  if (!take && !film.episodeId && !verdictSlug) return null

  return (
    <div className="mt-3 border-l-2 border-pink-200 pl-4">
      {take && (
        <p className="text-sm leading-6 text-slate-700">
          <span className="font-bold text-slate-900">Our take: </span>
          {take}
        </p>
      )}
      <p className="mt-1 flex flex-wrap gap-x-4 text-sm">
        {film.episodeId && (
          <Link href={`/${film.episodeId}`} className="font-semibold text-pink-600 hover:text-pink-700">
            Listen to our {film.title} episode →
          </Link>
        )}
        {verdictSlug && (
          <Link
            href={`/is-it-a-christmas-movie/${verdictSlug}`}
            className="font-semibold text-pink-600 hover:text-pink-700"
          >
            Is {film.title} a Christmas movie? →
          </Link>
        )}
      </p>
    </div>
  )
}

export function ListCrossLinks({ current }) {
  return (
    <nav aria-label="More Christmas movie lists" className="mt-16 rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900">More Christmas movie lists</h2>
      <ul className="mt-3 space-y-2">
        {LIST_PAGES.filter((p) => p.href !== current).map((p) => (
          <li key={p.href}>
            <Link href={p.href} className="font-semibold text-pink-600 hover:text-pink-700">
              {p.label} →
            </Link>
          </li>
        ))}
        <li>
          <Link href="/christmas-episodes" className="font-semibold text-pink-600 hover:text-pink-700">
            TV Christmas episodes, show by show →
          </Link>
        </li>
      </ul>
    </nav>
  )
}
