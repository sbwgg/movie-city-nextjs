/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({opacityValue}) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'header': 'rgba(var(--header-bg), 0.7)',
        'mobileBackground': 'rgb(var(--navigation-background))'
      },
      backgroundImage: {
        'main-radial': 'radial-gradient(circle, rgba(2,0,36,0) 0%, rgba(0,0,0,0.8015581232492998) 100%)',
        'color-linear': 'linear-gradient(to right,rgb(88, 181, 230) 0, rgb(250, 78, 147) 100%)'
      },
      backgroundPosition: {
        'center-top': 'center top'
      },
      backgroundSize: {
        '20': '20px'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        'white-black': withOpacity('--color-white'),
        'black-white': withOpacity('--color-black'),
        'primary-blue': withOpacity('--color-primary-blue'),
        'primary-pink': withOpacity('--color-primary-pink'),
        'secondary-blue': withOpacity('--color-secondary-blue'),
        'primary-gray': withOpacity('--color-primary-gray'),
        'secondary-gray': withOpacity('--color-secondary-gray'),
      },
    },
  },
  plugins: []
}
