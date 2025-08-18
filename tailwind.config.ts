/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F172A",
        card: "#1E293B",
        primary: "#3B82F6",
        accent: "#22D3EE",
        highlight: "#FACC15",
        text: "#F9FAFB",
      },
    },
  },
  plugins: [],
};
