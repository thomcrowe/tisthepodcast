'use client'

import Image from 'next/image'
import Link from 'next/link'

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

// Client component on purpose: the page still server-renders the full grid
// as HTML, but Next.js then only ships this compact items array to the
// browser instead of a second serialized copy of 470 cards of markup.
// items: [id, showTitle, episodeNumber, poster|null, take]
export function WatchListGrid({ items }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
      {items.map(([id, showTitle, episodeNumber, poster, take]) => (
        <Link key={id} href={`/${id}`} className="group">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-800 shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:shadow-lg group-hover:ring-green-400">
            {poster ? (
              <Image
                src={poster}
                alt={showTitle}
                width={200}
                height={200}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-700 to-slate-900 p-3">
                <FilmIcon className="h-6 w-6 text-slate-400" />
                <span className="text-center text-xs font-medium leading-tight text-slate-300 line-clamp-4">
                  {showTitle}
                </span>
              </div>
            )}
            <div className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              {episodeNumber}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs font-semibold leading-snug text-slate-800 transition-colors line-clamp-2 group-hover:text-green-700">
              {showTitle}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">Ep. {episodeNumber}</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-500 line-clamp-2">{take}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
