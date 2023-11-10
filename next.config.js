/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'scontent.fkkc3-1.fna.fbcdn.net',
            port: '',
            pathname: '**',
          },
        ],
      },
}

module.exports = nextConfig
