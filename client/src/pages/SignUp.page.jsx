import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { registerUser } from "../redux/reducers/authReducer/auth.action";

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      phoneno: "",
      error: "",
      success: false,
    };

    // binding utility functions
    this.onChangeValues = this.onChangeValues.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //function that sets value to state
  onChangeValues(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ error: nextProps.errors }, () => {});
    }
  }

  //function to handle submission and handle the controll to redux
  async onSubmit(e) {
    e.preventDefault();

    const newUser = {
      fullname: this.state.fullName,
      email: this.state.email,
      phno: this.state.phoneno,
      password: this.state.password,
    };

    this.props.registerUser(newUser, this.props.history);
    setTimeout(() => {
      this.setState({ success: this.state.error ? false : true }, () => {});
    }, 2000);

    setTimeout(() => {
      this.setState({ error: "" });
    }, 5000);
  }

  render() {
    return (
      <div>
        <div className="bg-logoColor pb-32 lg:flex lg:justify-between lg:items-center lg:pb-20">
          <div className="text-white pt-6 text-center lg:text-left">
            <h2 className="text-3xl font-semibold tracking-wider lg:text-5xl lg:ml-32">
              Hi! New to
            </h2>
            <span className="uppercase text-3xl font-bold  tracking-wider lg:text-5xl lg:ml-32">
              movie town
            </span>
            <h5 className="mt-2 text-xs font-light tracking-widest text-center sm:px-2 md:px-0 lg:text-lg lg:pl-32 lg:text-left">
              Fill up the form and unlock special offers & great benefits
            </h5>
          </div>
          <div className="mx-8 mt-6 md:mx-48 lg:mt-16 lg:mx-24 lg:w-1/3">
            <div className="bg-white rounded-lg shadow-xl lg:rounded-extendedcorner lg:shadow-2xl">
              {/* error alert */}
              <div className={this.state.error ? "block" : "hidden"}>
                <div
                  className="bg-red-100 border-t-4 border-red-500 rounded-lg text-teal-900 px-4 py-3"
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1">
                      <svg
                        className="fill-current h-6 w-6 text-red-500 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">{this.state.error}</p>
                      <p className="text-sm">
                        Make sure to fix these errors and try again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="pt-3">
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
                      <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor">
                        <i className={`fas fa-user text-gray-400`}></i>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Full name"
                          value={this.state.fullName}
                          onChange={this.onChangeValues}
                          required
                          className="bg-transparent ml-2 text-xs w-48 h-6 focus:outline-none lg:text-sm lg:w-4/5 lg:h-8"
                        />
                      </div>
                    </div>

                    <div className="mt-2 lg:mt-4">
                      <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor">
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
                      <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor">
                        <i className={`fas fa-phone text-gray-400`}></i>
                        <input
                          type="phoneno"
                          name="phoneno"
                          id="phoneno"
                          placeholder="Phone number"
                          value={this.state.phoneno}
                          onChange={this.onChangeValues}
                          required
                          className="bg-transparent ml-2 text-xs w-48 h-6 focus:outline-none lg:text-sm lg:w-4/5 lg:h-8"
                        />
                      </div>
                    </div>

                    <div className="mt-2 lg:mt-4">
                      <div className="border border-gray-600 mx-8 py-2 rounded md:pl-4 lg:py-4 hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor">
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
                    already a member?
                    <Link to="/auth/signin">
                      <span className="text-logoColor hover:text-blue-900">
                        sign in
                      </span>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(SignUpPage)
);
