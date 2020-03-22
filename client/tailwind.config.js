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
        pc: "502px",
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        "38": '38%'
      },
      borderRadius: {
        extendedcorner: "20px"
      }
    }
  },
  variants: {
    borderColor: ["responsive", "hover", "focus"],
    borderWidth: ["responsive", "hover", "focus"]
  },
  plugins: []
};
