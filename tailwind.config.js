/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: "rgb(28, 39, 76)",
        customGreen: "rgb(12, 190, 94)",
      },
      screens: {
        xs: "320px", // Extra small screens
        sm: "480px", // Small screens
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
        xl: "1440px", // Extra large screens
        "2xl": "1536px", // 2x Extra large screens
        custom: "1600px", // Custom breakpoint
      },
    },
  },
  plugins: [],
};
