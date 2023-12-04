import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pr-bg': "#E6EDF3",
        'pr-bg-3': "#576573",
        'pr-gray-1': '#696969',
        'pr-msu-1': "#FFC736",
        'pr-msu-2': "#253445",
        'pr-msu-1-60': "#96741c",
        "pr-text-menu": "#515151"
      },
      dropShadow: {
        'pr-shadow-text': '0 2px 0px rgba(0, 0, 0, 0.2)'
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
export default config
