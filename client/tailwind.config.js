/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#001bff",
      },
      boxShadow: {
        custom: "0px 6px 40px 10px #272222;",
      },
    },
  },
  plugins: [],
};
