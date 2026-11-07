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
          500: '#D6B46A', // Updated to Brand Accent Luxury Gold
          600: '#C5A257', // Brand Accent Hover
          700: '#6E4F14',
          800: '#523A0E',
          900: '#382607',
        },
        brand: {
          primary: '#111827',
          accent: '#D6B46A',
          'accent-hover': '#C5A257',
          'accent-light': '#F3E9D2',
        },
        sidebar: {
          bg: '#111827',
          active: '#D6B46A',
          text: '#A7B0C0',
        },
        page: '#F7F4ED',
        card: '#FFFFFF',
        secondaryCard: '#202C3D',
        textPrimary: '#182230',
        textSecondary: '#667085',
        borderColor: '#E5E0D5',
        lead: {
          hot: '#DC5252',
          warm: '#E5A23B',
          cold: '#4388C7',
          interested: '#299D75',
          notInterested: '#8992A2',
          progress: '#8065C9',
          new: '#D6B46A',
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
