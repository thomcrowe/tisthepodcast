import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Tis the Podcast',
    default:
      'Tis the Podcast - Keeping the Christmas spirit alive 365 days a year',
  },
  description: 'Keeping the Christmas spirit alive 365 days a year.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <head>
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
          src="https://kit.fontawesome.com/34f0432225.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
