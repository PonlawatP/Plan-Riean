/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://hilarious-crab-sheath-dress.cyclic.app/:path*'
        },
      ]
    }}

module.exports = nextConfig
