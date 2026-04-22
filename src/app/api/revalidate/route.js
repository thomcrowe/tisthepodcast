import { revalidatePath, revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

// Called by a webhook or cron to flush the ISR cache.
// Protect with REVALIDATE_SECRET env var set in Vercel dashboard.
export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/', 'layout')

  return Response.json({ revalidated: true, at: new Date().toISOString() })
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization')
  const expectedToken = process.env.REVALIDATE_SECRET
    ? `Bearer ${process.env.REVALIDATE_SECRET}`
    : null

  if (expectedToken && authHeader !== expectedToken) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/', 'layout')

  return Response.json({ revalidated: true, at: new Date().toISOString() })
}
