/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './main.tsx',
    './components/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
        secondary: {
          DEFAULT: '#fbbf24',
        },
      },
    },
  },
  plugins: [],
};
