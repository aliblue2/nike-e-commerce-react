/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#009688",
        accentColor: "#00897B",
        dividerColor: "#80CBC4",
        whiteColor: "#f7f7f7",
        blackColor: "#232323",
      },
    },
  },
  plugins: [],
};
