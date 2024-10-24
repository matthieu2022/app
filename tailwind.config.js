// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#308dc2",
        "custom-orange": "#ffcc66",
        "custom-green": "#009494",
      },
    },
  },
  plugins: [],
};
