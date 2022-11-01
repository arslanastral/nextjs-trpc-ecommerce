/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/lib/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        logo: ['Righteous', 'Arial']
      },
      colors: {
        'green-50': '#feefe9',
        'green-100': '#e3d4d1',
        'green-200': '#cab9b4',
        'green-300': '#b49d98',
        'green-400': '#9d817b',
        'green-500': '#846862',
        'green-600': '#67514b',
        'green-700': '#4b3a35',
        'green-800': '#2f221e',
        'green-900': '#180903'
      }
    }
  },
  plugins: []
};
