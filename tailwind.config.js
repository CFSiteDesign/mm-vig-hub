/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Mad Monkey brand anchors (Studio brand_config)
        ink: '#0a0a0a',
        cream: '#f5efe2',
        surface: '#151413',
        line: 'rgba(245, 239, 226, 0.14)',
        muted: 'rgba(245, 239, 226, 0.64)',
        // Mad Monkey pop colours
        pop: {
          blue: '#0081f7',
          yellow: '#ffc000',
          lime: '#ccff01',
          cyan: '#00fef3',
          orange: '#ff6600',
          green: '#03ff01',
          violet: '#ab00ff',
          pink: '#ff01aa',
        },
      },
    },
  },
  plugins: [],
}
