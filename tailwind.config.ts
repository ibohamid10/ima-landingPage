import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080d0d",
        cream: "#f8f5ef",
        sand: "#f6f3ee",
        sandDeep: "#e8e1d7",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
