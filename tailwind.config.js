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
      backgroundSize: {
        '20': '20px'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        'primary-blue': withOpacity('--color-primary-blue'),
        'secondary-blue': withOpacity('--color-secondary-blue'),
        'primary-gray': withOpacity('--color-primary-gray'),
        'secondary-gray': withOpacity('--color-secondary-gray'),
      },
    },
  },
  plugins: []
}
