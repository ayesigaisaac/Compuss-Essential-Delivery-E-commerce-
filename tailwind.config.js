/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#F96167',
          dark: '#E14850',
          light: '#FFB3B6',
        },
        gold: {
          DEFAULT: '#F9E795',
          dark: '#EFD558',
        },
        navy: {
          DEFAULT: '#2F3C7E',
          light: '#4C5AA8',
          dark: '#232D5E',
        },
        offwhite: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 10px rgba(47, 60, 126, 0.06)',
        'card-hover': '0 12px 24px rgba(47, 60, 126, 0.12)',
        nav: '0 2px 16px rgba(47, 60, 126, 0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
