/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A0FB0",
        success: "#00A650",
        "light-gray": "#757575",
        "card-bg": "#F8F9FE",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [],
};
