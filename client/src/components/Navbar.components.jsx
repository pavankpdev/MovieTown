import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../redux/reducers/authReducer/auth.action";
class Navbar extends Component {
  constructor() {
    super();
    this.state = { isClicked: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  toggleMenu = () => {
    this.setState({ isClicked: this.state.isClicked ? false : true });
  };

  onClickLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="lg:-mx-6 bg-white">
        <div className="px-4 py-3 flex justify-between items-center shadow lg:px-8">
          {/* Logo container */}
          <div>
            <span className="uppercase text-logoColor text-2xl font-bold tracking-wider">
              movie town
            </span>
          </div>
          {/* Hamburger menu for smaller screen */}
          <div className="text-logoColor sm:block md:block lg:hidden xl:hidden">
            <button
              className="hover:text-headingColor focus:outline-none focus:text-logoColor"
              onClick={this.toggleMenu}
            >
              <i className="fa fa-bars fa-2x " aria-hidden="true"></i>
            </button>
          </div>
          {/* Buttons for large screens */}
          <div className={isAuthenticated ? `hidden` : ``}>
            <div className="sm:hidden md:hidden lg:block xl:block">
              <Link to="/auth/signin">
                <button className="ml-4 mr-4 uppercase tracking-widest font-semibold px-3 py-1 text-sm text-logoColor hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor focus:outline-none">
                  sign in
                </button>
              </Link>
              <Link to="/auth/signup">
                <button className="ml-4 uppercase tracking-widest font-semibold px-3 py-1 text-sm text-white border-2 border-logoColor rounded bg-logoColor hover:bg-white hover:text-logoColor focus:bg-white focus:text-logoColor focus:outline-none">
                  sign up
                </button>
              </Link>
            </div>
          </div>
          <div className={isAuthenticated ? `` : `hidden`}>
            <div className="sm:hidden md:hidden lg:block xl:block">
              <button
                onClick={this.onClickLogout}
                className="ml-4 uppercase tracking-widest font-semibold px-3 py-1 text-sm text-white border-2 border-logoColor rounded bg-logoColor hover:bg-white hover:text-logoColor focus:bg-white focus:text-logoColor focus:outline-none"
              >
                logout
              </button>
            </div>
          </div>
        </div>
        {/* Buttons for smaller screens appears when toggled */}
        <div className={isAuthenticated ? `hidden` : ``}>
          <div
            className={
              this.state.isClicked ? "block pt-2 pb-4" : "hidden pt-2 pb-4"
            } // listening to toggle
          >
            <Link to="/auth/signin">
              <button className="block ml-4 mr-4 uppercase tracking-widest font-semibold px-3 py-1 text-xs text-logoColor hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor focus:outline-none">
                sign in
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="block ml-4 mt-3 uppercase tracking-widest font-semibold px-3 py-1 text-xs text-white border-2 border-logoColor rounded bg-logoColor hover:bg-white hover:text-logoColor focus:bg-white focus:text-logoColor focus:outline-none">
                sign up
              </button>
            </Link>
          </div>
        </div>
        <div className={isAuthenticated ? `` : `hidden`}>
          <div
            className={
              this.state.isClicked ? "block pt-2 pb-4" : "hidden pt-2 pb-4"
            }
          >
            <button
              onClick={this.onClickLogout}
              className="block ml-4 mt-3 uppercase tracking-widest font-semibold px-3 py-1 text-xs text-white border-2 border-logoColor rounded bg-logoColor hover:bg-white hover:text-logoColor focus:bg-white focus:text-logoColor focus:outline-none"
            >
              logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
