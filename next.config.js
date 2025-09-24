/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://geoprop-ai-backend.up.railway.app',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://geoprop-ai-backend.up.railway.app'}/api/:path*`,
      },
    ]
  },
  trailingSlash: false,
  poweredByHeader: false,
}

module.exports = nextConfig