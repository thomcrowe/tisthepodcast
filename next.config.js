const filmReviews = require('./src/data/film-reviews.json')
const isItChristmas = require('./src/data/is-it-christmas.json')

// Films with both a review and a verdict page: the verdict page is canonical
// and the review content lives there (see src/lib/film-links.js).
const isItSlugs = new Set(isItChristmas.map((a) => a.slug))
const mergedReviewRedirects = filmReviews
  .filter((f) => isItSlugs.has(f.slug))
  .map((f) => ({
    source: `/reviews/${f.slug}`,
    destination: `/is-it-a-christmas-movie/${f.slug}`,
    permanent: true,
  }))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.raster.app',
      },
      {
        // iTunes / Apple Music artwork served via Apple's CDN
        protocol: 'https',
        hostname: '**.mzstatic.com',
      },
      {
        // TMDB poster images
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'pbcdn1.podbean.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
      },
      {
        protocol: 'https',
        hostname: 'external-preview.redd.it',
      },
      {
        // Facebook CDN (wildcard for regional subdomains)
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.toughpigs.com',
      },
      {
        protocol: 'https',
        hostname: 'www.allrecipes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.creativeboom.com',
      },
    ],
  },
  async redirects() {
    return [
      // www → non-www redirect (permanent 301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tisthepodcast.com' }],
        destination: 'https://tisthepodcast.com/:path*',
        permanent: true,
      },
      // The default *.vercel.app production alias serves full duplicate pages —
      // send it to the canonical host. (www → apex is handled at the Vercel
      // domain level as a 308; the rule above is a belt-and-braces fallback.)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tisthepodcast.vercel.app' }],
        destination: 'https://tisthepodcast.com/:path*',
        permanent: true,
      },
      // Remove trailing slashes (permanent 301)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Old homepage pagination (/?page=N) moved to static /page/N
      {
        source: '/',
        has: [{ type: 'query', key: 'page', value: '(?<n>\\d+)' }],
        destination: '/page/:n',
        permanent: true,
      },
      ...mergedReviewRedirects,
      // Rename The List to The Watch List
      {
        source: '/the-list',
        destination: '/the-watch-list',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
