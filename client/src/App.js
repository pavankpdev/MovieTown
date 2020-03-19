import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./pages/Home.page";
import "./css/index.css";
class App extends Component {
  render() {
    return (
      <div className="lg:mx-6 xl:mx-6">
        <BrowserRouter>
          <Route component={HomePage} path="/" exact />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
