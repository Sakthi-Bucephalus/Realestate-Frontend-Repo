/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FCF8EF',
          100: '#F5EBD3',
          200: '#EBD7A7',
          300: '#DEC07A',
          400: '#CCA34A',
          500: '#B88A2E', // Primary Gold
          600: '#8C671D', // Dark Gold
          700: '#6E4F14',
          800: '#523A0E',
          900: '#382607',
        },
        surface: {
          main: '#FFFFFF',
          secondary: '#F8F8F6',
          softGold: '#FCF8EF',
          border: '#E8E2D5',
        },
        textPrimary: '#262626',
        textSecondary: '#737373',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 1px 2px 0 rgba(184, 138, 46, 0.08)',
        'gold-md': '0 4px 12px -2px rgba(184, 138, 46, 0.12), 0 2px 6px -2px rgba(184, 138, 46, 0.08)',
        'gold-lg': '0 12px 24px -4px rgba(184, 138, 46, 0.15)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.04), 0 0 1px 1px rgba(232, 226, 213, 0.4)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
