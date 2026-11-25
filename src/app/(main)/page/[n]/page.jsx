import { notFound, permanentRedirect } from 'next/navigation'

import { EpisodeListPage, getTotalPages } from '@/components/EpisodeListPage'

export async function generateStaticParams() {
  const total = await getTotalPages()
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }))
}

export async function generateMetadata({ params }) {
  const { n } = await params
  return {
    title: `All Episodes — Page ${n}`,
    alternates: { canonical: `https://tisthepodcast.com/page/${n}` },
    // Archive pages are for browsing; the episodes themselves are indexed.
    robots: { index: false, follow: true },
  }
}

export default async function EpisodeArchivePage({ params }) {
  const { n } = await params
  const page = Number(n)
  if (!Number.isInteger(page) || page < 1) notFound()
  if (page === 1) permanentRedirect('/')
  if (page > (await getTotalPages())) notFound()
  return <EpisodeListPage page={page} />
}

export const revalidate = 3600
