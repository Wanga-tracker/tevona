import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // toggle dark/light themes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        brand: {
          dark: "#0F172A",
          card: "#1E293B",
          primary: "#3B82F6",
          accent: "#22D3EE",
          highlight: "#FACC15",
          text: "#F9FAFB",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-animate"),
  ],
};

export default config;
