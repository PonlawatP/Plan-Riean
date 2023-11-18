/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
      locales: ['th', 'en'],
      defaultLocale: 'th', 
      localeDetection: false, 
    },
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