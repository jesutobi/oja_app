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
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-in-out both'
      },
      scale: {
        102: '1.02' // Custom scale value
      }
    }
  }
  // plugins: [require('@tailwindcss/forms')]
}
