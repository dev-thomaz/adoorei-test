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
      danger:'#CE382A',
      danger_dark:'#8C1D1A',
      positive:'#03AC13', 
      positive_dark:'#028A0D', 
      secondary: '#13ADDB',
      white: '#fff',
      white_soft:'#FBFBFB',
      black: '#000',
      gray: '#666',
      soft_white: '#F1F1F1'
    },
    screens: {
     
      'sm': '360px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
