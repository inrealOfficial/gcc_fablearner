import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Update these colors based on the actual logo colors
        primary: {
          50: "#f0f7ff",
          100: "#e0f0fe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a6f6",
          500: "#0c87e8",
          600: "#0072d6",
          700: "#0058aa",
          800: "#00498c",
          900: "#003e73",
        },
        secondary: {
          50: "#f8f5ff",
          100: "#f0eaff",
          200: "#e2d5ff",
          300: "#ceb2ff",
          400: "#b285fd",
          500: "#9656fa",
          600: "#7e33ed",
          700: "#6a21d1",
          800: "#571cab",
          900: "#491b8c",
        },
        accent: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#fbcf16",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
      },
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -30px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
        },
      },
      animation: {
        blob: "blob 8s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
