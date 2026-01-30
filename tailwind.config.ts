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
        primary: "#c49b63",
        secondary: "#33211d",
        dark: "#1a1a1a",
        accent: "#e4d3c1",
      },
      fontFamily: {
        josefin: ["var(--font-josefin)", "sans-serif"],
        nothing: ["var(--font-nothing)", "cursive"],
        "great-vibes": ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
