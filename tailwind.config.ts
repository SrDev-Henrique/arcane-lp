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
          green: "#4F7942",
          sageGreen: "#B2AC88",
          celadon: "#8A9A5B",
          purple: "#8A2BE2",
          gray: "#A9A9A9",
          "dark-gray": "#1D1D1D",
          red: "#8B0000",
          orange: "#FF4500",
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
        silco: {
          DEFAULT: "#511D26",
          transparent: "#511D2699",
        },
        vander: {
          DEFAULT: "#A05A2C",
          transparent: "#A05A2C99",
        },
        violet: {
          DEFAULT: "#B12C3D",
          transparent: "#B12C3D99",
        },
        jinx: {
          DEFAULT: "#417AA5",
          transparent: "#417AA599",
        },
        ekko: {
          DEFAULT: "#8A9A79",
          transparent: "#8A9A7999",
        },
      },
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        cinzel: ["cinzel", "sans-serif"],
        lora: ["lora", "sans-serif"],
        playfair: ["playfair", "sans-serif"],
        "playfair-italic": ["playfair-italic", "sans-serif"],
        "cinzelDecorative-regular": ["cinzelDecorative-regular", "sans-serif"],
        "cinzelDecorative-bold": ["cinzelDecorative-bold", "sans-serif"],
        "cinzelDecorative-black": ["cinzelDecorative-black", "sans-serif"],
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
        diagonal: "diagonal 3s infinite alternate ease-in-out",
      },
      screens: {
        "md-lg": "880px",
      },
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
    "from-silco",
    "to-silco-transparent",
    "from-vander",
    "to-vander-transparent",
    "from-violet",
    "to-violet-transparent",
    "from-jinx",
    "to-jinx-transparent",
    "from-ekko",
    "to-ekko-transparent",
  ],
  plugins: [],
} satisfies Config;
