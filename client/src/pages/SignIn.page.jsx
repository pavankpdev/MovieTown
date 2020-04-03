import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { loginUser } from "../redux/reducers/authReducer/auth.action";

class SigninPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };

    // binding utility functions
    this.onChangeValues = this.onChangeValues.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //function that sets value to state
  onChangeValues(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //function to handle submission
  async onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);

    // sending data to server with axios, and redirecting user to home page if authenticated
    try {
      const loginUser = await Axios.post("/users/login", userData);

      this.props.loginUser(loginUser.data);
    } catch (error) {
      console.log(error);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="bg-logoColor pb-32 lg:flex lg:justify-between lg:items-center lg:pb-20">
        <div className="text-white pt-16 text-center lg:text-left lg:pt-48">
          <h2 className="text-3xl font-semibold tracking-wider lg:text-5xl lg:ml-32">
            Welcome back to
          </h2>
          <span className="uppercase text-3xl font-bold  tracking-wider lg:text-5xl lg:ml-32">
            movie town
          </span>
          <h5 className="mt-2 text-xs font-light tracking-widest text-center sm:px-2 md:px-0 lg:text-lg lg:pl-32 lg:text-left">
            Sign in to unlock special offers & great benefits
          </h5>
        </div>
        <div className="mx-8 mt-10 md:mx-48 lg:mx-24 lg:w-1/3 lg:mt-48">
          <div className="bg-white rounded-lg shadow-xl lg:rounded-extendedcorner lg:shadow-2xl">
            <div>
              <div className="pt-6">
                <center>
                  <span className="uppercase text-logoColor text-2xl font-bold tracking-wider mt-2 lg:text-3xl">
                    movie town
                  </span>
                </center>
              </div>
              <div className="mt-4 pb-6 sm:text-center md:text-center lg:pb-16">
                <form
                  onSubmit={this.onSubmit}
                  className="mx-auto sm:text-center md:text-left"
                >
                  <div className="mt-2 lg:mt-4">
                    <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 ">
                      <i className={`fas fa-envelope text-gray-400`}></i>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChangeValues}
                        required
                        className="bg-transparent ml-2 text-xs w-48 h-6 focus:outline-none lg:text-sm lg:w-4/5 lg:h-8"
                      />
                    </div>
                  </div>

                  <div className="mt-2 lg:mt-4">
                    <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 ">
                      <i className={`fas fa-lock text-gray-400`}></i>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChangeValues}
                        required
                        className="bg-transparent ml-2 text-xs w-48 h-6 focus:outline-none lg:text-sm lg:w-4/5 lg:h-8"
                      />
                    </div>
                  </div>

                  <div className="my-3 mx-8 flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-logoColor text-white px-6 py-1 rounded shadow-lg uppercase text-xs tracking-wider lg:py-2"
                    >
                      sign up
                    </button>
                  </div>
                </form>
                <span className="text-xs font-semibold text-textColor tracking-wide pt-2 lg:text-base">
                  New to Movie Town?
                  <Link to="/auth/signup">
                    <span className="text-logoColor hover:text-blue-900">
                      sign up
                    </span>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(SigninPage));
