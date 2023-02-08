/** @type {import('tailwindcss').Config} */

module.exports = {
  mode:'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode:false,
  theme: {
    extend: {},
    colors:{
      transparent: 'transparent',
      primary: '#0A7999',
      secondary: '#13ADDB',
      white: '#fff',
      black: '#000'
    }
  },
  plugins: [],
}
