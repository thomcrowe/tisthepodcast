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
      {
        source: '/the-list',
        destination: '/the-watch-list',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
