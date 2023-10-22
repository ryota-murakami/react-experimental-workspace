const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./Suggestion.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  theme: {
    screens: {
      // max-sm	@media not all and (min-width: 640px) { ... }
      // max-md	@media not all and (min-width: 768px) { ... }
      // max-lg	@media not all and (min-width: 1024px) { ... }
      // max-xl	@media not all and (min-width: 1280px) { ... }
      // max-2xl @media not all and (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
