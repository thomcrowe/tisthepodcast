import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/tailwind.css'

const SITE_URL = 'https://tisthepodcast.com'
const SITE_NAME = 'Tis the Podcast'
const SITE_DESCRIPTION =
  'Keeping the Christmas spirit alive 365 days a year. Join Anthony, Julia, and Thom as they review and rank Christmas movies every week.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Keeping the Christmas spirit alive 365 days a year`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Christmas podcast',
    'Christmas movies',
    'holiday podcast',
    'Christmas movie reviews',
    'Christmas movie rankings',
    'Tis the Podcast',
    'Christmas spirit',
  ],
  authors: [
    { name: 'Anthony Caruso' },
    { name: 'Julia Colburn' },
    { name: 'Thom Crowe' },
  ],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Keeping the Christmas spirit alive 365 days a year`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tis the Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Keeping the Christmas spirit alive 365 days a year`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': 'https://feed.podbean.com/tisthepodcast/feed.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
      </head>
      <body className="flex min-h-full">
        <div className="w-full">{children}</div>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G6WVFWNYX0"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G6WVFWNYX0');
          `}
        </Script>
      </body>
    </html>
  )
}
