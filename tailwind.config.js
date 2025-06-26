/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#597eec',    // Masculino
        secondary: '#f76482',  // Feminino
        tertiary: '#57bb7f',   // Todos
        tooltip: '#ffffff',
        tooltipBorder: '#dddddd',
      },
      boxShadow: {
        tooltip: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
      fontSize: {
        tooltip: '14px',
      }
    },
  },
  plugins: [],
}

