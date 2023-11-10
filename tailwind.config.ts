import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pr-bg': "#E6EDF3",
        'pr-gray-1': '#696969',
        'pr-msu-1': "#FFC736",
        'pr-msu-2': "#253445",
        'pr-msu-1-60': "#96741c",
      },
      dropShadow: {
        'pr-shadow-text': '0 2px 0px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}
export default config
