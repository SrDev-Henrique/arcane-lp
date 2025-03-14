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
          transparent: "#FFD70099",
          title: "#d6b600",
          dark: "#C4A84A",
          background: "#F5F5DC",
          red: "#8f0b13",
          "red-transparent": "#B2222299",
          "dark-transparent": "#C4A84A99",
          fadedBrown: "#7a7454",
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
        arcane: {
          pink: "#C71585",
          purple: "#8A2BE2",
        },
        white: {
          DEFAULT: "#FFFFFF",
          dark: "#D0D0D0",
          darker: "#FFFFFF33",
        },
        black: {
          light: "#141414",
          lighter: "#1D1D1D",
          DEFAULT: "#000000",
          dark: "#0a0a0a",
          intense: "#0D0D0D",
        },
        yellow: {
          300: "#edff66",
        },
        blue: {
          light: "#b0e0e6",
        },
        caitlyn: {
          DEFAULT: "#35637C",
          transparent: "#35637C99",
        },
        mel: {
          DEFAULT: "#B79E58",
          transparent: "#B79E5899",
        },
        jayce: {
          DEFAULT: "#8C5A3C",
          transparent: "#8C5A3C99",
        },
        viktor: {
          DEFAULT: "#B87148",
          transparent: "#B8714899",
        },
        heimerdinger: {
          DEFAULT: "#D6A741",
          transparent: "#D6A74199",
        },
      },
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        cinzel: ["cinzel", "sans-serif"],
        lora: ["lora", "sans-serif"],
        "lora-italic": ["lora-italic", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(.9)", translate: "(-50%, -50%)" },
          "50%": { transform: "scale(1)", translate: "(-50%, -50%)" },
        },
        diagonal: {
          "0%": { transform: "translate(-10px, 10px) rotate(-1deg)" },
          "100%": { transform: "translate(10px, -10px)" },
        },
      },
      animation: {
        pulse: "pulse 1s infinite",
        diagonal:
          "diagonal 3s infinite alternate ease-in-out",
      },
      screens: {
        "md-lg": "880px",
      }
    },
  },
  safelist: [
    "from-caitlyn",
    "to-caitlyn-transparent",
    "from-mel",
    "to-mel-transparent",
    "from-jayce",
    "to-jayce-transparent",
    "from-viktor",
    "to-viktor-transparent",
    "from-heimerdinger",
    "to-heimerdinger-transparent",
  ],
  plugins: [],
} satisfies Config;
