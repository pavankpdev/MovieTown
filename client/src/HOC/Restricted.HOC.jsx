import React from "react";
import { Route } from "react-router-dom";

const RestrictedHOC = ({ component: Component, ...rest }) => {
  return <Route {...rest} component={props => <Component {...props} />} />;
};

export default RestrictedHOC;
