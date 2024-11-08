/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yash: {
          400: "neutral-content"
        }
      }
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
  mode: 'jit'
}
