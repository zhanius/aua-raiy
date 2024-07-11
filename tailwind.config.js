/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  
  theme: {
    extend: {
      fontFamily:{
        'dela':['Dela Gothic One', 'sans-serif'],
        'rowdies':['Rowdies', 'sans-serif'],
        'bodoni':['Bodoni Moda SC', 'serif'],
        'sawarabi':['Sawarabi Mincho', 'serif']
      }
    },
  },
  plugins: [],
}
