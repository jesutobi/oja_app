module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          from: {
            transform: 'translateY(-0.75rem)',
            opacity: '0'
          },
          to: {
            transform: 'translateY(0rem)',
            opacity: '1'
          }
        },

        skeleton: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both',

        skeleton: 'skeleton 3s infinite linear'
      },
      scale: {
        102: '1.02' // Custom scale value
      },
      colors: {
        yellow: {
          400: '#FFBF00' // your custom shade of yellow
        }
      }
    }
  }
  // plugins: [require('@tailwindcss/forms')]
}
