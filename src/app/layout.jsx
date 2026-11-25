import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/tailwind.css'
import { JsonLd } from '@/components/JsonLd'
import { ORG_ID, WEBSITE_ID } from '@/lib/schema'

const SITE_URL = 'https://tisthepodcast.com'
const SITE_NAME = 'Tis the Podcast'
const SITE_DESCRIPTION =
  'Keeping the Christmas spirit alive 365 days a year. Anthony Caruso, Julia Colburn, and Thom Crowe review and rank Christmas movies, TV specials, and holiday episodes every week — year-round since 2017.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Christmas Movie Reviews & Rankings`,
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
    title: `${SITE_NAME} | Christmas Movie Reviews & Rankings`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: '/og-image.jpg',
        width: 800,
        height: 800,
        alt: 'Tis the Podcast — Christmas Movie Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Christmas Movie Reviews & Rankings`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://feed.podbean.com/tisthepodcast/feed.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Sitewide identity: lets Google show "Tis the Podcast" as the site name
// and ties the podcast's profiles together.
const siteLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.jpg`,
        width: 800,
        height: 800,
      },
      description: SITE_DESCRIPTION,
      foundingDate: '2017-08',
      founder: [
        { '@type': 'Person', name: 'Anthony Caruso' },
        { '@type': 'Person', name: 'Julia Colburn' },
        { '@type': 'Person', name: 'Thom Crowe' },
      ],
      sameAs: [
        'https://open.spotify.com/show/1oVhOnOULzGZbRYTEBGEal',
        'https://podcasts.apple.com/us/podcast/tis-the-podcast/id1272483416',
        'https://www.patreon.com/tisthepodcast',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      alternateName: ["'Tis the Podcast", 'Tis the Podcast Christmas Movie Podcast'],
      url: SITE_URL,
      inLanguage: 'en-US',
      publisher: { '@id': ORG_ID },
    },
  ],
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
      </head>
      <body className="flex min-h-full">
        <JsonLd data={siteLd} />
        <div className="w-full">{children}</div>
        <Analytics />
        <SpeedInsights />
        <Script id="load-fontshare" strategy="afterInteractive">{`
          (function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap';document.head.appendChild(l)})();
        `}</Script>
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
