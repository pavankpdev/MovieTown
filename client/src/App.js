import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import { setUser, logoutUser } from "./redux/reducers/authReducer/auth.action";
import { defaultAxiosHeader } from "./utils/axiosDefaults";
import HomePage from "./pages/Home.page";
import SignInPage from "./pages/SignIn.page";
import SignUpPage from "./pages/SignUp.page";
import MovieInfoPage from "./pages/MovieInfo.page";
import SearchMovies from "./pages/SearchMovies.page";
import SelectTheater from "./pages/SelectTheaters.pages";
import Seats from "./pages/Seats.page";
import Mytickets from "./pages/Mytickets.pages";
import UnrestrictedHOC from "./HOC/Unrestricted.HOC";
import RestrictedHOC from "./HOC/Restricted.HOC";
import store from "./redux/store";
import "./css/index.css";

// check for token
if (localStorage.jwtToken) {
  //set auth token to axios default header
  defaultAxiosHeader(localStorage.jwtToken);
  // decode the jwt token for user info
  const decodeUser = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated in redux store to true
  store.dispatch(setUser(decodeUser));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decodeUser.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="antialiased">
            <UnrestrictedHOC component={HomePage} path="/" exact />
            <UnrestrictedHOC component={MovieInfoPage} path="/movies" exact />
            <UnrestrictedHOC
              component={SearchMovies}
              path="/movies/search"
              exact
            />
            <UnrestrictedHOC
              component={SelectTheater}
              path="/movies/theater"
              exact
            />
            <UnrestrictedHOC component={Seats} path="/movies/seats" exact />
            <UnrestrictedHOC component={Mytickets} path="/mytickets" exact />
            <RestrictedHOC exact path="/auth/signin" component={SignInPage} />
            <RestrictedHOC exact path="/auth/signup" component={SignUpPage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
