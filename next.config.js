/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://fine-puce-donkey-cuff.cyclic.app/:path*'
        },
      ]
    }}

module.exports = nextConfig
