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
          dark_yellow:'#EABE7C'
        },
      },
      boxShadow: {
        'right': '4px 0 12px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        'custom-black': 'rgba(0, 0, 0, 0.5)', // Custom RGBA color
        'custom-white-menu': 'rgba(226, 232, 240, 0.7)', // Custom RGBA color 226 232 240

      },
    },
  },
  plugins: [],
}