import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./pages/Home.page";
import "./css/index.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={HomePage} path="/" exact />
      </BrowserRouter>
    );
  }
}
export default App;
