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
    ],
  },
}

module.exports = nextConfig
