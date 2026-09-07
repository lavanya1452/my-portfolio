/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0d1117',
        panel: '#121826',
        mist: '#dfe7ee',
        muted: '#99a3b6',
        accent: '#5eead4',
        accentSoft: '#2dd4bf'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(94,234,212,0.2), 0 24px 80px rgba(13,17,23,0.7)',
      },
      letterSpacing: {
        tightish: '-0.04em'
      }
    },
  },
  plugins: [],
}

