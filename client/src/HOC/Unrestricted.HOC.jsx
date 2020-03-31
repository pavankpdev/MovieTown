import React from "react";
import { Route } from "react-router-dom";

import Navbar from "../components/Navbar.components";

const UnrestrictedHOC = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => (
        <div>
          <Navbar />
          <Component {...props} />
        </div>
      )}
    />
  );
};

export default UnrestrictedHOC;
