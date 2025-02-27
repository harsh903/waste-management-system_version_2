/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5ea',
          100: '#ccead5',
          200: '#99d6aa',
          300: '#66c180',
          400: '#33ad55',
          500: '#00982b', // Primary
          600: '#007a22',
          700: '#005b1a',
          800: '#003d11',
          900: '#001e09',
        },
        secondary: {
          50: '#e6f2ff',
          100: '#cce5ff',
          200: '#99cbff',
          300: '#66b0ff',
          400: '#3396ff',
          500: '#007cff', // Secondary
          600: '#0063cc',
          700: '#004a99',
          800: '#003266',
          900: '#001933',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};