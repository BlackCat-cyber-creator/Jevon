/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#030712",       // Deep cosmic obsidian
        secondary: "#94a3b8",
        tertiary: "#0c1527",      // Abyssal navy glass
        "abyss-950": "#02040a",
        "abyss-900": "#060b18",
        "abyss-800": "#0d172e",
        "pirate-gold": "#f59e0b",
        "pirate-gold-light": "#fde047",
        "pirate-gold-bright": "#fbbf24",
        "pirate-bronze": "#b45309",
        "pirate-brass": "#d97706",
        "cyber-cyan": "#06b6d4",
        "cyber-cyan-light": "#67e8f9",
        "cyber-emerald": "#10b981",
        "crimson-privateer": "#e11d48",
        "black-100": "#0a1020",
        "black-200": "#050914",
        "white-100": "#f8fafc",
      },
      boxShadow: {
        card: "0px 25px 80px -15px rgba(6, 182, 212, 0.12)",
        gold: "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        "gold-glow": "0 0 25px rgba(245, 158, 11, 0.25), 0 0 60px rgba(245, 158, 11, 0.08)",
        "gold-border": "inset 0 0 0 1px rgba(245, 158, 11, 0.35)",
        cyan: "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "cyan-glow": "0 0 25px rgba(6, 182, 212, 0.25), 0 0 60px rgba(6, 182, 212, 0.08)",
        crimson: "0 0 20px rgba(225, 29, 72, 0.3)",
        hud: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "panel": "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
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
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(245,158,11,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.15)' },
        },
      },
      animation: {
        wobble: 'wobble 5s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        scanline: 'scanline 8s linear infinite',
        'gold-pulse': 'goldPulse 3s ease-in-out infinite',
      },
      fontFamily: {
        pirata: ["Pirata One", "cursive"],
        cinzel: ["Cinzel", "serif"],
        sans: ["Outfit", "Poppins", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #a5f3fc 0%, #06b6d4 50%, #0284c7 100%)',
        'abyss-gradient': 'linear-gradient(180deg, #030712 0%, #050B1A 50%, #0B1528 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(12,21,39,0.8) 0%, rgba(5,11,26,0.9) 100%)',
      },
    },
  },
  plugins: [],
};
