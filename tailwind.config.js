/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colors ──────────────────────────────────────────────────
      // brand-1: primary (main CTAs, accents)
      // brand-2: secondary accent
      // brand-3: error / alert
      // brand-4: dark / text
      // brand-5: success / positive CTA (WhatsApp green, etc.)
      // brand-6: light background
      colors: {
        brand: {
          1: "#1a6fff",   // primary dark
          2: "#0044cc",   // accent / highlight
          3: "#dc3545",   // error / danger
          4: "#1e2a38",   // dark blue
          5: "#00a650",   // success / WhatsApp
          6: "#f5f5f5",   // light bg
        },
        blue: {
          DEFAULT: '#1a6fff',
          dark: '#0044cc',
        },
        ice: '#d6f0ff',
        steel: '#1e2a38',
        dark: '#0d0d0d',
      },
      container: {
        center: true,
        padding: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
  },
  plugins: [],
};
