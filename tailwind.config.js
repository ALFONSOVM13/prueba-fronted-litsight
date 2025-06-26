/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeDown: {
          'from': {
            opacity: '0',
            transform: 'translate3d(0, -32px, 0)'
          },
          'to': {
            opacity: 'initial',
            transform: 'initial'
          }
        }
      },
      animation: {
        'fadeDown': 'fadeDown 0.8s'
      }
    }
  },
  plugins: [],
} 