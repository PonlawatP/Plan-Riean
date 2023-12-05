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
            hostname: 'thumbs.dreamstime.com',
            port: '',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'www.msu.ac.th',
            port: '',
            pathname: '**',
          },
        ],
      },
}

module.exports = nextConfig