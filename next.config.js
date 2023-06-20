/** @type {import('next').NextConfig} */

console.log(process.env.API_SUBJECT_DATABASE)

const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.API_SUBJECT_DATABASE + '/:path*'
        },
      ]
    }}

module.exports = nextConfig
