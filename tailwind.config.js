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
        simbees: {
          // Primary Palette
          'honey': '#F9C80E',
          'black': '#1A1A1A',
          'light-gray': '#F5F5F5',
          // Secondary Palette
          'charcoal': '#2E2E2E',
          'white': '#FFFFFF',
          'orange': '#F48C06',
          // Status Colors
          'profit': '#4CAF50',
          'loss': '#E63946',
          'neutral': '#2196F3',
        }
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
