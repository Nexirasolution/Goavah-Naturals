/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        cormorant: ["var(--font-cormorant)"],
      },
      colors: {
        // base surfaces — clean off-white, letting the logo's green
        // and brown sit clearly on top, like the logo's white background
        ivory: "#FCFAF6",
        champagne: "#EDE3D0",
        // warm dark brown ink, matched to the "Pure" wordmark brown
        ink: "#3A2415",
        muted: "#8F8070",

        // brand accents
        // "forest" key retained for compatibility; matched directly to
        // the deep green of the GOAVAH wordmark and leaf icon
        forest: {
          DEFAULT: "#2F5C1E",
          light: "#4C7A34",
          dark: "#1F3F13",
        },
        // "gold" key retained for compatibility; matched to the warm
        // brown of the "Pure" script text in the logo
        gold: {
          DEFAULT: "#8B4A20",
          light: "#B06B3A",
          dark: "#663214",
        },
        // Muted olive-clay — a secondary accent between the green and
        // brown, for badges, discount tags, cart count
        terracotta: "#6B5A2E",
      },
      boxShadow: {
        soft: "0 6px 24px rgba(58, 36, 21, 0.09)",
        card: "0 10px 36px rgba(58, 36, 21, 0.11)",
      },
    },
  },
  plugins: [],
};