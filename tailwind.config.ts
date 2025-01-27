import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        piltover: {
          light: "#FFEBB7",
          DEFAULT: "#FFD700",
          dark: "#C4A84A",
        },
        zaun: {
          light: "#A6E22E",
          DEFAULT: "#4CAF50",
          dark: "#2E8B57",
        },
        neutral: {
          light: "#F0F0F0",
          DEFAULT: "#808080",
          dark: "#333333",
        },
        accent: {
          light: "#dfdff2",
          pink: "#FF6F61",
          purple: "#8A2BE2",
          blue: "#00BFFF",
        },
        netflix: {
          light: "#B76E79",
          DEFAULT: "#E50914",
          dark: "#FF4C4C",
        },
        yellow: {
          300: "#edff66",
        },
        arcane: {
          pink: "#C71585",
          purple: "#8A2BE2",
        },
        white: {
          DEFAULT: "#FFFFFF",
          dark: "#e8e8ed",
          darker: "#d4d4d4",
        },
      },
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(.9)", translate: "(-50%, -50%)" },
          "50%": { transform: "scale(1)", translate: "(-50%, -50%)" },
        },
      },
      animation: {
        pulse: "pulse 1s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
