/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-background': '#c8d9e3',
        'primary': '#7b10b0',
        'secondary': '#be5fed',
        'tertiary': '#bb80d9'
      }
    },
  },
  plugins: [],
}

