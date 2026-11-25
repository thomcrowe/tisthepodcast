import { revalidatePath } from 'next/cache'

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

function revalidateAll() {
  revalidatePath('/', 'layout')
  return Response.json({ revalidated: true, at: new Date().toISOString() })
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return revalidateAll()
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return revalidateAll()
}
