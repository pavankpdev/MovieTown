module.exports = {
  theme: {
    screens: {
      sm: "300px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px"
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      textColor: {
        logoColor: "#5a67d8",
        headingColor: "#001934",
        textColor: "#303030"
      },
      backgroundColor: theme => ({
        logoColor: "#5a67d8",
        headingColor: "#001934",
        textColor: "#303030"
      }),
      borderColor: theme => ({
        logoColor: "#5a67d8",
        headingColor: "#001934",
        textColor: "#303030"
      }),
      spacing: {
        pc: "502px"
      },
      borderRadius: {
        extendedcorner: "30px"
      }
    }
  },
  variants: {
    borderColor: ["responsive", "hover", "focus"],
    borderWidth: ["responsive", "hover", "focus"]
  },
  plugins: []
};
