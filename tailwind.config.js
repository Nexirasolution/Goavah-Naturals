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
        // base surfaces — the cream tone of malt/health-mix powders and
        // idli podi, rather than a generic "food site" ivory
        ivory: "#FCF7ED",
        champagne: "#F0DFB8",
        // deep roasted-spice brown (curry masala, roasted coriander) —
        // not pure black, has real warmth
        ink: "#2B1D12",
        muted: "#8A7360",

        // brand accents
        // "forest" key retained for compatibility; now the deep amber-
        // brown of cold-pressed sesame/groundnut oil itself — your most
        // literal product color, used as the primary brand tone.
        forest: {
          DEFAULT: "#7A4A1E",
          light: "#A06B34",
          dark: "#55330F",
        },
        // "gold" key retained for compatibility; true turmeric —
        // directly the color of your turmeric powder/raw turmeric,
        // your most recognizable single product.
        gold: {
          DEFAULT: "#E8A400",
          light: "#F4C43D",
          dark: "#B37E00",
        },
        // Dried red chilli / curry masala rust — for badges, discount
        // tags, cart count. Ties to sambar powder and curry masala.
        terracotta: "#C1440E",
      },
      boxShadow: {
        soft: "0 6px 24px rgba(43, 29, 18, 0.09)",
        card: "0 10px 36px rgba(43, 29, 18, 0.11)",
      },
    },
  },
  plugins: [],
};