import React, { Component } from "react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = { isClicked: false };

    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu = () => {
    this.setState({ isClicked: this.state.isClicked ? false : true });
  };

  render() {
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
          <div className="sm:hidden md:hidden lg:block xl:block">
            <button className="ml-4 mr-4 uppercase tracking-widest font-semibold px-3 py-1 text-sm text-logoColor hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor focus:outline-none">
              sign in
            </button>
            <button className="ml-4 uppercase tracking-widest font-semibold px-3 py-1 text-sm text-white border-2 border-logoColor rounded bg-logoColor hover:bg-white hover:text-logoColor focus:bg-white focus:text-logoColor focus:outline-none">
              sign up
            </button>
          </div>
        </div>
        {/* Buttons for smaller screens appears when toggled */}
        <div
          className={
            this.state.isClicked ? "block pt-2 pb-4" : "hidden pt-2 pb-4"
          } // listening to toggle
        >
          <button className="block ml-4 mr-4 uppercase tracking-widest font-semibold px-3 py-1 text-xs text-logoColor hover:border-2 hover:border-logoColor focus:border-2 focus:border-logoColor focus:outline-none">
            sign in
          </button>
          <button className="block ml-4 mt-3 uppercase tracking-widest font-semibold px-3 py-1 text-xs text-white border-2 border-logoColor rounded bg-logoColor hover:bg-white hover:text-logoColor focus:bg-white focus:text-logoColor focus:outline-none">
            sign up
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
