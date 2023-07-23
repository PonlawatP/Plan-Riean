/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "plate-1": "rgb(243	238	254)",
        "plate-2": "rgb(243	238	254)",
        "plate-3": "rgb(219	215	245)",
        "plate-4": "rgb(168	177	221)",
        "plate-5": "rgb(67	72	113)"
      },
      width: {
        "side-l": "20rem"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
