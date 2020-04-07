import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../redux/reducers/authReducer/auth.action";
import SearchBar from "./SearchBar.component";

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
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="lg:-mx-6 bg-white">
        <div className=" px-6 py-3 flex justify-between items-baseline shadow lg:px-8">
          {/* Logo container */}
          <div>
            <span className="uppercase text-logoColor text-xl font-bold tracking-wider lg:text-2xl">
              <Link to="/"> movie town</Link>
            </span>
          </div>
          {/* search bar for larger screen */}
          <div className="sm:hidden md:block lg:block xl:block">
            <div className="flex items-baseline text-logoColor">
              <SearchBar />
              
            </div>
          </div>

          {/* Hamburger menu for smaller screen */}
          <div className="-mr-32 text-logoColor md:hidden lg:hidden xl:hidden">
            <button
              className="hover:text-headingColor focus:outline-none focus:text-logoColor"
              onClick={this.toggleMenu}
            >
              <i className="fa fa-bars fa-2x " aria-hidden="true"></i>
            </button>
          </div>
          {/* Buttons for large screens */}
          <div className={isAuthenticated ? `hidden` : ``}>
            <div className="sm:hidden md:block lg:block xl:block">
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
          {/* compoenents to show only when logged in */}
          <div className={isAuthenticated ? `` : `hidden`}>
            <div className="flex items-center">
              <i className="fas fa-shopping-basket fa-lg mr-8 text-logoColor"></i>
              <div
                className="cursor-pointer sm:hidden lg:block xl:block"
                onClick={() => console.log("clicked avatar")}
              >
                <img
                  className="rounded-full"
                  src="https://randomuser.me/api/portraits/thumb/men/62.jpg"
                  alt="user"
                />
              </div>
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
            {/* search bar for smaller screen */}
            <SearchBar />
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
