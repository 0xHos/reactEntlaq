/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: {
          blue: '#03045e',
          green: '#7dcfb6',
          yellow: '#eabe7c',
          dark_yellow:'#EABE7C',
          button:'rgb(255, 255, 255 ,0.4)'
        },
      },
      boxShadow: {
        'right': '4px 0 12px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        'custom-black': 'rgba(0, 0, 0, 0.5)', // Custom RGBA color
        'custom-opicty-blue': '#1d1f68b3', // Custom RGBA color 30 64 175

        'custom-white-menu': 'rgba(226, 232, 240, 0.7)', // Custom RGBA color 226 232 240

      },
    },
  },
  plugins: [],
}