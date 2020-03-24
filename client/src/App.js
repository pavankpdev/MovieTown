import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home.page";
import SignInPage from "./pages/SignIn.page";
import SignUpPage from './pages/SignUp.page';
import UnrestrictedHOC from "./HOC/Unrestricted.HOC";
import RestrictedHOC from "./HOC/Restricted.HOC";

import "./css/index.css";
class App extends Component {
  render() {
    return (
      <div className="antialiased">
        <BrowserRouter>
          <div className="lg:mx-6 xl:mx-6">
            <UnrestrictedHOC component={HomePage} path="/" exact />
          </div>
          <RestrictedHOC exact path="/auth/signin" component={SignInPage} />
          <RestrictedHOC exact path="/auth/signup" component={SignUpPage} />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
