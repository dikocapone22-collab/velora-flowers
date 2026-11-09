import type { Config } from 'tailwindcss'

// Дизайн-токены VELORA FLOWERS
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5F0',
        paper: '#FFFFFF',
        wine: { DEFAULT: '#641D32', dark: '#4A1525' },
        ink: '#252321',
        muted: '#665E57',
        sand: '#EADFD3',
        powder: '#E8CFCF',
        blush: '#F5E9E6',
        line: '#E5DCD1',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
