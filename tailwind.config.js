module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: ({ colors }) => ({
      ...colors,
      gray1: "#f4f4f4",
      gray2: "#e0e0e0",
      gray6: "#6f6f6f",
      gray7: "#525252",
      gray10: "#161616",
    }),
  },
  variants: {},
  plugins: [],
};
