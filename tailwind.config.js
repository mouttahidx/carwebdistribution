/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    flowbite.content(),

  ],
  theme: {
    extend: {
      backgroundImage:{
        'slider-mobile':"url('/img/sliders/slider1_bg.jpg')",
        'slider-desktop':"url('/img/sliders/slider1_bg.jpg')"
      },
      colors: {
        "rachel-black": {
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#313131",
          950: "#212121",
        },
        "rachel-red": {
          50: "#fff0f0",
          100: "#ffdddd",
          200: "#ffc1c1",
          300: "#ff9595",
          400: "#ff5959",
          500: "#ff2626",
          600: "#fc0606",
          700: "#d40000",
          800: "#af0505",
          900: "#900c0c",
          950: "#500000",
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"),    flowbite.plugin(),
  ],
};
