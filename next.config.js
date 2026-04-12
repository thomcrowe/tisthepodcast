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
