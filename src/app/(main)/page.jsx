import { EpisodeListPage } from '@/components/EpisodeListPage'

export const metadata = {
  alternates: { canonical: 'https://tisthepodcast.com' },
}

export default function Home() {
  return <EpisodeListPage page={1} />
}

export const revalidate = 3600
