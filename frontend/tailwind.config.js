/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx, html}'],
  plugins: [
      require('@tailwindcss/forms'),
  ],
  theme: {
    colors: {
      'ebony': '#5f6a5cff',
      'black-olive': '#39413eff',
      'rich-black': '#131720ff',
      'dim-gray': '#737275ff',
      'timberwolf': '#d3ccc9ff',
      'battleship-gray': '#878e89ff',
      'dark-slate-gray': '#3a4f49ff',
      'dim-gray-2': '#647070ff',
      'taupe-gray': '#8e9197ff',
      'white' : '#ffffff',
    },
    scale: {
      '0': '0',
      '10': '.1',
     '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
     '95': '.95',
      '100': '1',
     '105': '1.05',
     '110': '1.1',
      '125': '1.25',
      '150': '1.5',
     '200': '2',
    },

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  //   extend: {
  //     spacing: {
  //       '8xl': '96rem',
  //       '9xl': '128rem',
  //     },
  //     borderRadius: {
  //       '4xl': '2rem',
  //     }
  //   }
  },
}