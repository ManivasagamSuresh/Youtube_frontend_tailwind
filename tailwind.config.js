/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        'calc56vh': 'calc(100vh - 56px)',
      },
      colors: {
        'custom': '#202020',
      },
    },
    
  },
  plugins: [],
}

