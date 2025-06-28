/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx}",
    "./src/services/**/*.{js,jsx,ts,tsx}",
    "./src/types/**/*.{js,jsx,ts,tsx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#060B28',
        light: '#F5F5F5',
      },
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
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slow-spin': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
        },
        'move-forever': {
          '0%': {
            transform: 'translate3d(-90px, 0, 0)'
          },
          '100%': {
            transform: 'translate3d(85px, 0, 0)'
          }
        },
        zoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)'
          },
          '50%': {
            opacity: '0.8'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'fadeDown': 'fadeDown 0.8s',
        shine: 'shine 3s linear infinite',
        'slow-spin': 'slow-spin 20s linear infinite',
        'move-forever': 'move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite',
        'zoomIn': 'zoomIn 0.5s ease-out'
      },
      boxShadow: {
        'glow': '0 0 8px rgba(255, 255, 255, 0.5)'
      }
    }
  },
  plugins: [],
} 