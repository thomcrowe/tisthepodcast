import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'
import schedule from '@/data/upcoming-episodes.json'

export function UpcomingEpisodes() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = schedule
    .filter((ep) => new Date(ep.publishDate) >= today)
    .slice(0, 5)

  if (upcoming.length === 0) return null

  return (
    <section className="mt-10 lg:mt-12">
      <h2 className="flex items-center gap-2.5 font-mono text-sm font-medium leading-7 text-slate-900">
        <TinyWaveFormIcon
          colors={['fill-red-600', 'fill-green-600']}
          className="h-2.5 w-2.5"
        />
        Coming Up
      </h2>
      <ul className="mt-4 space-y-3">
        {upcoming.map((ep) => {
          const date = new Date(ep.publishDate)
          const label = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
          return (
            <li key={ep.publishDate} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 font-mono text-xs leading-5 text-slate-400 w-12">
                {label}
              </span>
              <span className="text-sm leading-5 text-slate-700 line-clamp-2">
                {ep.title}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
