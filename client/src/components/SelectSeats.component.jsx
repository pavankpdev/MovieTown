import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

import MobileScreen from "../asset/Line 2.svg";
import Seats from "./Seats.component";
import "./styles/SelectSeats.styles.css";
class SeatsComp extends Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: [],
      toggle: false,
    };
  }
  componentDidMount() {
    if (!localStorage.selectedMovie) {
      alert("Something went wrong");
    }
    this.setState({ selectedMovie: JSON.parse(localStorage.selectedMovie) });
  }
  render() {
    return (
      <div>
        {/* image */}
        <div>
          <div className="absolute w-full select-seat_backdropImage md:w-full  xs:hidden sm:hidden  md:block lg:block xl:block">
            <div className="px-6 flex justify-between items-center xs:flex-none sm:flex-none lg:flex xl:flex">
              <div className="w-6/12 mt-10 xs:hidden md:block sm:hidden lg:block xl:block">
                <h3 className="text-white font-bold text-xl select-seat_title">
                  {this.state.selectedMovie.title}
                </h3>
                <h5 className="text-white font-semibold text-sm uppercase tracking-wider">
                  {this.state.selectedMovie.production_companies !== undefined
                    ? this.state.selectedMovie.production_companies[0].name
                    : "Team Effort"}
                </h5>
                <span className="text-white text-xs uppercase tracking-wider font-semibold">
                  {this.state.selectedMovie.original_language}&#8226;
                  {this.state.selectedMovie.genres !== undefined
                    ? this.state.selectedMovie.genres[0].name
                    : "DRAMA"}
                  &#8226;UA
                </span>
              </div>
            </div>
          </div>
          <img
            src={`http://image.tmdb.org/t/p/original/${this.state.selectedMovie.backdrop_path}`}
            alt="background image"
          />
        </div>
        {/* theater info */}
        <div className="mx-4 mt-5">
          <h3 className="text-xl font-bold text-headingColor">
            {this.props.location.state.theaterDetails.name}
          </h3>
          <h3 className="text-xs font-light w-10/12 truncate  text-gray-600">
            {this.props.location.state.theaterDetails.location}
          </h3>
          <span className="uppercase text-sm text-gray-600">
            {this.props.location.state.theaterDetails.date}{" "}
            {this.props.location.state.theaterDetails.month} |{" "}
            {this.props.location.state.theaterDetails.time} |{" "}
            {this.props.location.state.theaterDetails.type}{" "}
          </span>
        </div>
        {/* Ticket legends */}
        <div className="mt-5 flex justify-around items-center">
          {/* selected */}
          <div className="text-logoColor flex justify-center items-center">
            <i className="fas fa-square fa-lg"></i>
            <h4 className="ml-2 text-gray-800 text-xs font-semibold uppercase tracking-widest">
              Selected
            </h4>
          </div>
          {/* available */}
          <div className="text-logoColor flex justify-center items-center">
            <i className="far fa-square fa-lg"></i>
            <h4 className="ml-2 text-gray-800 text-xs font-semibold uppercase tracking-widest">
              available
            </h4>
          </div>
          {/* sold out */}
          <div className="text-gray-400 flex justify-center items-center">
            <i className="fas fa-square fa-lg"></i>
            <h4 className="ml-2 text-gray-800 text-xs font-semibold uppercase tracking-widest">
              sold out
            </h4>
          </div>
        </div>
        {/* screen */}
        <div className="mt-8 md:hidden lg:hidden xl:hidden">
          <center>
            <img className="h-12" src={MobileScreen} alt="screen" />
          </center>
        </div>
        {/* seats */}
        <div className="">
          <div>
            <Seats />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SeatsComp);
