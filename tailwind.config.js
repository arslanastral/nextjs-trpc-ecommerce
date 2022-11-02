/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/lib/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        logo: ['Righteous', 'Arial']
      },
      colors: {
        'brown-50': '#feefe9',
        'brown-100': '#e3d4d1',
        'brown-200': '#cab9b4',
        'brown-300': '#b49d98',
        'brown-400': '#9d817b',
        'brown-500': '#846862',
        'brown-600': '#67514b',
        'brown-700': '#4b3a35',
        'brown-800': '#2f221e',
        'brown-900': '#180903'
      }
    }
  },
  plugins: []
};
