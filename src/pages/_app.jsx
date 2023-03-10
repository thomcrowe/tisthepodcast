import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/index.scss'
import 'focus-visible'


export default function App({ Component, pageProps }) {
  return (
    <AudioProvider>
      <Layout>
        <Component {...pageProps} />
      <Analytics />
      </Layout>
    </AudioProvider>
  )
}

