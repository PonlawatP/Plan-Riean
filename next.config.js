/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://real-blue-antelope-tie.cyclic.app/:path*'
        },
      ]
    }}

module.exports = nextConfig
