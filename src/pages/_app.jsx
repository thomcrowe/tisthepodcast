import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'
import { SpeedInsights } from '@vercel/speed-insights/react'

import '@/styles/index.scss'
import 'focus-visible'


export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AudioProvider>
      <Layout>
        <Component {...pageProps} />
      <Analytics />
      <SpeedInsights route={router.pathname} />
      </Layout>
    </AudioProvider>
  )
}

