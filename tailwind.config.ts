import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      transitionTimingFunction: {
        'pr-bounce': 'cubic-bezier(0, 0.48, 0.15, 1.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pr-blue': '#0075F7',
        'pr-blue-dark': '#002D74',
        'pr-dark': '#181C27',
        'pr-bg': '#E6EDF3',
        'pr-bg-1': '#CACFD9',
        'pr-bg-3': '#576573',
        'pr-gray-1': '#696969',
        'pr-gray-2': '#ababab',
        'pr-msu-1': '#FFC736',
        'pr-msu-2': '#253445',
        'pr-msu-1-60': '#96741c',
        'pr-text-menu': '#515151',
      },
      dropShadow: {
        'pr-shadow-text': '0 2px 0px rgba(0, 0, 0, 0.2)',
      },
      screens: {
        xs: '450px',
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
      },
      fontFamily: {
        k2d: ['K2D'],
      },
      borderRadius: {
        b25: '18%',
      },
      inset: {
        '-10': '-10px',
      },
      keyframes: {
        slidein: {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        slidein300: 'slidein 1s ease 300ms forwards',
        slidein500: 'slidein 1s ease 500ms forwards',
        slidein700: 'slidein 1s ease 700ms forwards',
      },
    },
  },
  plugins: [],
};
export default config;
