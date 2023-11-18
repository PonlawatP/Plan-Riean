/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
      locales: ["th", "en"],
      defaultLocale: "th",
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
