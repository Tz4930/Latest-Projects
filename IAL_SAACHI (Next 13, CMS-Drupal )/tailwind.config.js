module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbg:"#1c1c1c",
        navtxt:"#999999",
        black:"#000",
        white:"#ffffff",
        blue:"#2295d2",
        socialIcons:"#606060",

      },
      screens: {
        'xs': '320px',
        'sm': '780px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      fontFamily: {
        'sans': ['Verdana', 'Helvetica', 'Arial', 'sans'],
      },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
}
