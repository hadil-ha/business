import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

/**
 * Tailwind CSS configuration for Hebrew RTL landing page
 * Brand color palette for financial consulting services
 */
const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // Hebrew font family - Heebo loaded via Google Fonts in index.html
      fontFamily: {
        sans: ['"Heebo"', ...defaultTheme.fontFamily.sans],
      },

      // Brand color palette
      colors: {
        brand: {
          black: '#1c1c1b',   // Dark section backgrounds, primary text on light
          gray: '#c6c6c6',    // Secondary text, subtle borders
          white: '#f8f6f7',   // Light section backgrounds, text on dark
          navy: '#09213a',    // Logo accent, CTA backgrounds, headings
          gold: '#e2a644',    // Highlights, hover states, stars
        },
      },

      // Smooth scrolling animation duration
      transitionDuration: {
        '400': '400ms',
      },
    },
  },

  plugins: [],
}

export default config
