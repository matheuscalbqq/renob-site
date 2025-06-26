/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./src/**/*.{html,js}"
  ],
  safelist: [
    /* todas as classes que criamos no @layer components */
    'tooltip-regional',
    'tooltip-content',
    'tooltip-title',
    'tooltip-subtitle',
    'tooltip-fem',
    'tooltip-masc',
    { pattern: /^line-/ },
    { pattern: /^circle-/ }
  ],
  theme: {
    extend: {
      colors: {
        masc: '#597eec',    // Masculino
        fem: '#f76482',  // Feminino
        all: '#57bb7f',   // Todos
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

