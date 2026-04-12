import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { getAllEpisodesForList, getItunesPoster } from '@/lib/episodes'

export const metadata = {
  title: 'The List',
  description:
    'Every movie, show, and special covered by Tis the Podcast — in episode order.',
  openGraph: {
    title: 'The List - Tis the Podcast',
    description:
      'Every movie, show, and special covered by Tis the Podcast — in episode order.',
  },
}

// Revalidate the page once a day so new episodes appear automatically
export const revalidate = 86400

// Poster images come from iTunes (mzstatic.com CDN). To keep builds fast we
// fetch all of them in parallel — Next.js caches each individual fetch for
// 30 days so only the very first build actually hits the iTunes API.
async function addPosters(episodes) {
  const posters = await Promise.all(
    episodes.map((ep) => getItunesPoster(ep.showTitle))
  )
  return episodes.map((ep, i) => ({ ...ep, poster: posters[i] }))
}

function FilmIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625ZM21 9.375A.375.375 0 0 0 20.625 9h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5A.375.375 0 0 0 21 10.875v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 0 0 .375-.375v-1.5ZM10.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h7.5ZM3.375 15h7.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-7.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h7.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 10.875 9h-7.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default async function TheListPage() {
  const episodes = await getAllEpisodesForList()
  const items = await addPosters(episodes)

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl/7 font-bold text-slate-900">The List</h1>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Every movie, show, and special we&apos;ve covered — {items.length} episodes, in
            order from the very first to the latest.
          </p>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id}`}
              className="group"
              title={`Ep. ${item.episodeNumber}: ${item.showTitle}`}
            >
              {/* Poster */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-800 shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:shadow-lg group-hover:ring-green-400">
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.showTitle}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, 33vw"
                  />
                ) : (
                  /* Fallback when iTunes has no artwork */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-700 to-slate-900 p-3">
                    <FilmIcon className="h-6 w-6 text-slate-400" />
                    <span className="text-center text-xs font-medium leading-tight text-slate-300 line-clamp-4">
                      {item.showTitle}
                    </span>
                  </div>
                )}

                {/* Episode number badge */}
                <div className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                  {item.episodeNumber}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-xs font-bold leading-tight text-white line-clamp-3">
                    {item.showTitle}
                  </span>
                </div>
              </div>

              {/* Title below poster */}
              <div className="mt-2">
                <p className="text-xs font-semibold text-slate-800 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                  {item.showTitle}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Ep. {item.episodeNumber}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
