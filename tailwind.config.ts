import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#111114",
          800: "#1a1a1f",
          700: "#26262d",
          600: "#3a3a44",
          500: "#5b5b67",
          400: "#878793",
          300: "#b0b0bb",
          200: "#d4d4dc",
          100: "#ececf0",
          50: "#f7f7f9",
        },
        flame: {
          50: "#fff4ec",
          100: "#ffe2cc",
          200: "#ffc499",
          300: "#ff9c5c",
          400: "#ff7a2b",
          500: "#ff6b00",
          600: "#e85d00",
          700: "#bf4a00",
        },
        mint: { 500: "#22c08a", 600: "#1aa276" },
        rose: { 500: "#ff4d6d", 600: "#e63c5b" },
        amber: { 500: "#f5a524" },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Inter Tight"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 24px 48px -16px rgba(0,0,0,0.55), 0 8px 16px -8px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(255,107,0,0.4), 0 8px 32px -8px rgba(255,107,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
