import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'
import { Analytics } from '@vercel/analytics/react';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

import '@/styles/index.scss'
import 'focus-visible'

export default function App({ Component, pageProps }) {
  return (
    <AudioProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AudioProvider>
  )
}


