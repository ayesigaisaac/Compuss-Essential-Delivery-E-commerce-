/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#F96167',
          dark: '#E14850',
        },
        gold: {
          DEFAULT: '#F9E795',
        },
        navy: {
          DEFAULT: '#2F3C7E',
        },
        offwhite: '#FAFAFA',
      },
    },
  },
  plugins: [],
}
