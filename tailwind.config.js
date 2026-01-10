/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,html}', './src/html/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        proxima: ['"Proxima Nova"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
