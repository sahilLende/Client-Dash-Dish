/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FED054",
          lighter: "#e67555",
          light: "#FFA500",
          dark: "#FF8C00",
        },
        red: {
          DEFAULT: "#FF0000",
          light: "#FF6347",
          dark: "#8B0000",
        },
        brown: {
          DEFAULT: "#612C20",
          dark: "#3A0E03",
          light: "#8B4513",
          darker: "#5D4037",
        },
      },
      width: {
        500: "500px",
        lg: "1280px",
        "7/10": "70%",
        "3/10": "30%",
        "1/20": "5%",
      },
      screens: {
        "max-md": { max: "767px" },
        "max-lg": { max: "1023px" },
        "max-xl": { max: "1280px" },
        "tilt-mobile": {
          raw: "((max-height: 600px) and (max-width:756px))",
        },
      },
    },
  },
  plugins: [],
};
