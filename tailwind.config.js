/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          50: '#E8EDF7',
          100: '#D1DBEF',
          200: '#A3B7DF',
          300: '#7593CF',
          400: '#476FBF',
          500: '#1E3A8A',
          600: '#1B346D',
          700: '#142751',
          800: '#0E1A36',
          900: '#070D1B',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FEF3E2',
          100: '#FDE7C5',
          200: '#FBCF8B',
          300: '#F9B751',
          400: '#F59E0B',
          500: '#C77F09',
          600: '#996007',
          700: '#6B4105',
          800: '#3D2203',
          900: '#1F1101',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
