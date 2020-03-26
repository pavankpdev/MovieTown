import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import HomePage from "./pages/Home.page";
import SignInPage from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";
import UnrestrictedHOC from "./HOC/Unrestricted.HOC";
import RestrictedHOC from "./HOC/Restricted.HOC";
import store from "./redux/store";
import "./css/index.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="antialiased">
            <div className="lg:mx-6 xl:mx-6">
              <UnrestrictedHOC component={HomePage} path="/" exact />
            </div>
            <RestrictedHOC exact path="/auth/signin" component={SignInPage} />
            <RestrictedHOC exact path="/auth/signup" component={SignUpPage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
