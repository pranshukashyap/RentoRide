/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add our custom fonts
        sans: ['Inter', ...fontFamily.sans],
        display: ['Poppins', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}