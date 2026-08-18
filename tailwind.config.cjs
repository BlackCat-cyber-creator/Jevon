/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030712", // Deep cosmic obsidian
        secondary: "#94a3b8",
        tertiary: "#0c1527", // Abyssal navy glass
        "abyss-950": "#02040a",
        "abyss-900": "#060b18",
        "abyss-800": "#0d172e",
        "pirate-gold": "#f59e0b",
        "pirate-gold-light": "#fde047",
        "pirate-bronze": "#b45309",
        "cyber-cyan": "#06b6d4",
        "cyber-cyan-light": "#67e8f9",
        "cyber-emerald": "#10b981",
        "black-100": "#0a1020",
        "black-200": "#050914",
        "white-100": "#f8fafc",
      },
      boxShadow: {
        card: "0px 25px 80px -15px rgba(6, 182, 212, 0.12)",
        gold: "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        cyan: "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        hud: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      screens: {
        xs: "450px",
      },
      keyframes: {
        wobble: {
          '0%': { transform: 'translate(0, -5px) scale(1) rotate(-0.5deg)' },
          '50%': { transform: 'translate(2px, -10px) scale(1.03) rotate(0.5deg)' },
          '100%': { transform: 'translate(0, -5px) scale(1) rotate(-0.5deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        wobble: 'wobble 5s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      fontFamily: {
        pirata: ["Pirata One", "cursive"],
        cinzel: ["Cinzel", "serif"],
        sans: ["Outfit", "Poppins", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
    },
  },
  plugins: [],
};
