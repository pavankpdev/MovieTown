import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

import MobileScreen from "../asset/Line 2.svg";
import PcScreen from "../asset/Path 17.svg";
import Seats from "./Seats.component";
import "./styles/SelectSeats.styles.css";
class SeatsComp extends Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: [],
      toggle: false,
      seats: [["wx"], ["xw"]],
      selectedSeats: ["xyz"],
    };
    this.recordIds = this.recordIds.bind(this);
  }
  componentDidMount() {
    if (!localStorage.selectedMovie) {
      alert("Something went wrong");
    }
    this.setState({
      selectedMovie: JSON.parse(localStorage.selectedMovie),
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps) {
      this.setState({
        seats: nextProps.seats,
      });
    }
  }
  recordIds(e) {
    this.setState({
      selectedSeats: [...this.state.selectedSeats, `${e.target.id}`],
    });
  }
  render() {
    return (
      <div>
        {/* image */}
        <div>
          <img
            src={`http://image.tmdb.org/t/p/original/${this.state.selectedMovie.backdrop_path}`}
            alt="background image"
            className="posterImage"
          />
        </div>
        {/* theater info */}
        <div className="mx-4 mt-5">
          <h3 className="text-xl font-bold text-headingColor lg:text-2xl">
            {this.props.location.state.theaterDetails.name}
          </h3>
          <h3 className="text-xs font-light w-10/12 truncate text-gray-600 lg:text-sm lg:text-headingColor">
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
        <div className="mt-5 flex justify-around items-center lg:mt-10">
          {/* selected */}
          <div className="text-logoColor flex justify-center items-center lg:text-2xl">
            <i className="fas fa-square fa-lg"></i>
            <h4 className="ml-2 text-gray-800 text-xs font-semibold uppercase tracking-widest lg:text-lg">
              Selected
            </h4>
          </div>
          {/* available */}
          <div className="text-logoColor flex justify-center items-center lg:text-2xl">
            <i className="far fa-square fa-lg"></i>
            <h4 className="ml-2 text-gray-800 text-xs font-semibold uppercase tracking-widest lg:text-lg">
              available
            </h4>
          </div>
          {/* sold out */}
          <div className="text-gray-400 flex justify-center items-center lg:text-2xl">
            <i className="fas fa-square fa-lg"></i>
            <h4 className="ml-2 text-gray-800 text-xs font-semibold uppercase tracking-widest lg:text-lg">
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
        {/* PC screen */}
        <div className="mt-16 sm: hidden md:block lg:block xl:block">
          <center>
            <img className="h-12" src={PcScreen} alt="screen" />
          </center>
        </div>
        {/* seats */}
        <div className="flex justify-around lg:mt-4">
          <div className="container w-6/12">
            <div className="inside-container p-3 flex flex-wrap mb-4 lg:px-48">
              {this.state.seats[0].map((seat) => (
                <input
                  {...seat}
                  key={Math.random()}
                  onChange={this.recordIds}
                  checked={
                    this.state.selectedSeats.includes(seat.id) ? true : false
                  }
                />
              ))}
            </div>
          </div>
          <div className="container w-6/12">
            <div className="inside-container p-3 flex flex-wrap mb-4 lg:px-48">
              {this.state.seats[1].map((seat) => (
                <input
                  {...seat}
                  key={Math.random()}
                  onChange={this.recordIds}
                  checked={
                    this.state.selectedSeats.includes(seat.id) ? true : false
                  }
                />
              ))}
            </div>
          </div>
        </div>
        {/* summary */}
        <div className="w-9/12 ml-4">
          <h1 className="text-logoColor text-lg font-semibold">
            Order Summary
          </h1>
          <div className="mt-2 border-b-2 border-headingColor">
            <div className="flex mx-auto justify-around items-baseline">
              <h3 className="font-semibold text-headingColor">Ticket Price</h3>
              <h4 className="text-gray-600 text-xs">
                {this.props.location.state.theaterDetails.price} x{" "}
                {this.state.selectedSeats.length - 1}
              </h4>
              <h3 className="font-semibold text-headingColor">
                {this.props.location.state.theaterDetails.price *
                  (this.state.selectedSeats.length - 1)}
              </h3>
            </div>
            <div className="flex mx-auto justify-around items-baseline">
              <h3 className="font-semibold text-headingColor">Service Fee</h3>
              <h4 className="text-gray-600 text-xs">
                60 x {this.state.selectedSeats.length - 1}
              </h4>
              <h3 className="font-semibold text-headingColor">
                {60 * (this.state.selectedSeats.length - 1)}
              </h3>
            </div>
          </div>
          <div className="flex mx-auto justify-between items-baseline text-headingColor px-4 border-b-2 border-headingColor">
            <h3>Grand Total</h3>
            <h3>
              {this.props.location.state.theaterDetails.price *
                (this.state.selectedSeats.length - 1) +
                60 * (this.state.selectedSeats.length - 1)}
            </h3>
          </div>
        </div>
        {/* checkout button */}
        <div className="content-center mx-4 mt-4">
          <button
            type="button"
            className="w-full uppercase text-xs tracking-wider text-white font-semibold bg-logoColor rounded-sm py-2"
          >
            book my ticket <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SeatsComp);
