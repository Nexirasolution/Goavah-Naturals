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
      },
      colors: {
        // base surfaces
        ivory: "#FBF7EF",
        champagne: "#F3E9D2",
        ink: "#2A2620",
        muted: "#7A7266",

        // brand accents
        forest: {
          DEFAULT: "#3F5C3A",
          light: "#5A7A54",
          dark: "#2C4128",
        },
        gold: {
          DEFAULT: "#B8923F",
          light: "#D4B876",
          dark: "#8F6E2C",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(42, 38, 32, 0.08)",
        card: "0 8px 30px rgba(42, 38, 32, 0.10)",
      },
    },
  },
  plugins: [],
};