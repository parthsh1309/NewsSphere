/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./views/**/**/*.{html,js,ejs}'],
  theme: {
    extend: {
      fontFamily: {
       'merri': 'Merriweather,Serif',
      },
      borderRadius: {
        '10px': '10px',
      },
      margin: {
        '10px': '10px',
      }
    },
  },
  plugins: [],
}

