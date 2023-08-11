/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ef233c",
        background: "#edf2f4",
        text: "#2b2d42",
        shadow: "#8d99ae",
        error: "#d90429"
      }
    },
  },
  plugins: [],
}

