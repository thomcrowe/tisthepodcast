import { revalidatePath } from 'next/cache'

import { getAllEpisodes } from '@/lib/episodes'

export const dynamic = 'force-dynamic'

// Flushes the ISR cache so new episodes show up everywhere.
//
// Accepted credentials:
//   - Vercel Cron: sends `Authorization: Bearer $CRON_SECRET` automatically
//     when the CRON_SECRET env var is set (see vercel.json "crons").
//   - Manual / webhook: `?secret=$REVALIDATE_SECRET` on GET, or
//     `Authorization: Bearer $REVALIDATE_SECRET` on GET or POST.
function isAuthorized(request) {
  const auth = request.headers.get('authorization')
  const query = request.nextUrl.searchParams.get('secret')
  const { CRON_SECRET, REVALIDATE_SECRET } = process.env

  if (!CRON_SECRET && !REVALIDATE_SECRET) return true // nothing configured
  if (CRON_SECRET && auth === `Bearer ${CRON_SECRET}`) return true
  if (REVALIDATE_SECRET && (auth === `Bearer ${REVALIDATE_SECRET}` || query === REVALIDATE_SECRET)) {
    return true
  }
  return false
}

// Pages that list episodes and should pick up a new one quickly. Everything
// else uses time-based ISR (stale-while-revalidate), so visitors always get a
// cached page instantly and rebuilds happen in the background.
const EPISODE_LIST_PATHS = ['/', '/the-watch-list', '/episodes', '/sitemap.xml', '/llms-full.txt']
const NEW_EPISODE_WINDOW_MS = 3 * 60 * 60 * 1000 // cron runs hourly; a little slack

// Purging the whole site every hour (revalidatePath('/', 'layout')) made the
// next visitor to each page wait for a blocking rebuild: p75 TTFB ~1.3s.
// Now the hourly cron only refreshes the listing pages, and only when a new
// episode has actually been published. `?scope=all` (with REVALIDATE_SECRET)
// still forces a full refresh when needed.
async function revalidate(request) {
  const scope = request.nextUrl.searchParams.get('scope')
  if (scope === 'all') {
    revalidatePath('/', 'layout')
    return Response.json({ revalidated: 'all', at: new Date().toISOString() })
  }

  const episodes = await getAllEpisodes({ fresh: true })
  const newest = episodes.reduce((max, e) => Math.max(max, new Date(e.published).getTime()), 0)
  const isNew = Date.now() - newest < NEW_EPISODE_WINDOW_MS
  if (!isNew) {
    return Response.json({ revalidated: false, reason: 'no new episode', newest: new Date(newest).toISOString() })
  }

  const year = new Date(newest).getUTCFullYear()
  const paths = [...EPISODE_LIST_PATHS, `/episodes/${year}`]
  for (const path of paths) revalidatePath(path)
  return Response.json({ revalidated: paths, newest: new Date(newest).toISOString() })
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return revalidate(request)
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return revalidate(request)
}
