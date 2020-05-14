import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import swal from "@sweetalert/with-react";
import { Success_payment } from "../function/Success_payment";

import MobileScreen from "../asset/Line 2.svg";
import PcScreen from "../asset/Path 17.svg";
import "./styles/SelectSeats.styles.css";
class SeatsComp extends Component {
  constructor() {
    super();
    this.state = {
      selectedMovie: [],
      theaterDetails: [],
      toggle: false,
      seats: [["wx"], ["xw"]],
      selectedSeats: ["xyz"],
      amount: 0,
    };
    this.recordIds = this.recordIds.bind(this);
    this.launchRazorPay = this.launchRazorPay.bind(this);
  }
  componentDidMount() {
    if (!localStorage.selectedMovie && !localStorage.theaterDetails) {
      swal(
        <div>
          <h1>Hello world!</h1>
          <p>This is now rendered with JSX!</p>
        </div>
      );
    }
    this.setState({
      selectedMovie: JSON.parse(localStorage.selectedMovie),
      theaterDetails: JSON.parse(localStorage.theaterDetails),
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        seats: nextProps.seats,
      });
    }
  }
  recordIds(e) {
    let oldData = this.state.selectedSeats;
    let price = Number(
      oldData.length * this.state.theaterDetails.price + 60 * oldData.length
    );
    if (oldData.includes(e.target.id)) {
      let res = oldData.filter((data) => data !== e.target.id);
      this.setState({
        selectedSeats: res,
        amount:
          this.state.amount - (Number(this.state.theaterDetails.price) + 60),
      });
      return;
    }
    this.setState({
      selectedSeats: [...this.state.selectedSeats, `${e.target.id}`],
      amount: price,
    });
  }
  launchRazorPay() {
    if (this.state.amount === 0) {
      return alert("Please select atleast one seat to proceed");
    }
    let data = {
      email: this.props.user.email,
      seats: this.state.selectedSeats,
      theater_name: this.state.theaterDetails.name,
      theater_address: this.state.theaterDetails.location,
      movie_name: this.state.selectedMovie.title,
      poster: this.state.selectedMovie.poster_path,
      time: this.state.theaterDetails.time,
      price: this.state.theaterDetails.price,
      quantity: this.state.selectedSeats.length - 1,
      type: this.state.theaterDetails.type,
      date: `${this.state.theaterDetails.date} ${this.state.theaterDetails.month}`,
    };
    let options = {
      key: "rzp_test_WFcjTVM7sIrlJx",
      amount: `${this.state.amount * 100}`,
      currency: "INR",
      name: "Movie Town",
      description: "Cinema Seat Reservation",
      image: "https://i.ibb.co/GH9nk13/typographical.png",
      handler: function (response) {
        Success_payment(data);
        swal(
          <div>
            <center>
              <img
                src="https://i.ibb.co/TWqBp2P/pluto-welcome.png"
                alt="success"
                className="w-9/12"
              />
              <h2 className="mt-5 text-headingColor text-lg font-bold">
                Yay!. Your seat has been reserved.
              </h2>
              <h4 className="text-gray-700 text-xs font-semibold ">
                You can find your ticket in ticket cart{" "}
                <i className="fas fa-shopping-basket fa-lg mr-8 text-logoColor"></i>
              </h4>
            </center>
          </div>
        );
      },
      prefill: {
        name: this.props.user.fullname,
        email: this.props.user.email,
      },
      
      theme: {
        color: "#5a67d8",
      },
    };
    let rzp = new window.Razorpay(options);
    rzp.open();
  }
  render() {
    return (
      <div>
        {/* image */}
        <div>
          <img
            src={`http://image.tmdb.org/t/p/original/${this.state.selectedMovie.backdrop_path}`}
            alt="backdrop_path"
            className="posterImage"
          />
        </div>
        {/* theater info */}
        <div className="mx-4 mt-5">
          <h3 className="text-xl font-bold text-headingColor lg:text-2xl">
            {this.state.theaterDetails.name}
          </h3>
          <h3 className="text-xs font-light w-10/12 truncate text-gray-600 lg:text-sm lg:text-headingColor">
            {this.state.theaterDetails.location}
          </h3>
          <span className="uppercase text-sm text-gray-600">
            {this.state.theaterDetails.date} {this.state.theaterDetails.month} |{" "}
            {this.state.theaterDetails.time} | {this.state.theaterDetails.type}{" "}
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
        <div className="flex justify-center flex-wrap mx-4 lg:mt-6 lg:mx-64 seats">
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
        {/* caution */}
        <div className="mx-3 mt-12 lg:mx-8">
          <h3 className="text-red-500 text-xs tracking-wider lg:text-sm">
            Please use below card details for payment and{" "}
            <span className="font-bold">
              If otp is asked, please click skip saved cards
            </span>
          </h3>
          <div className="flex justify-around items-center text-xs text-headingColor lg:justify-start lg:text-sm">
            <ul>
              <li>Card no:- 5104 0600 0000 0008 </li>
              <li>exp:- 12/21 </li>
              <li>cvv: 123</li>
            </ul>
            <ul className="lg:ml-4">
              <li>Card no:- 4111 1111 1111 1111 </li>
              <li>exp:- 12/21 </li>
              <li>cvv: 123</li>
            </ul>
          </div>
        </div>
        {/* summary */}
        <div className="mt-12 lg:flex lg:justify-around mt-12 lg:items-center bg-logoColor py-4 text-white mx-4 rounded-extendedcorner shadow-lg lg:mx-6 lg:py-8">
          <div className="w-9/12 ml-4  lg:w-4/12 lg:mt-0">
            <h1 className="text-xl font-semibold lg:text-2xl text-white">
              Order Summary
            </h1>
            <div className="mt-2 border-b-2 border-white">
              <div className="flex mx-auto items-baseline justify-between">
                <h3 className="   lg:text-xl text-white">Ticket Price</h3>
                <h4 className=" text-xs  lg:text-sm text-white">
                  {this.state.theaterDetails.price} x{" "}
                  {this.state.selectedSeats.length - 1}
                </h4>
                <h3 className="  lg:text-xl text-white">
                  {this.state.theaterDetails.price *
                    (this.state.selectedSeats.length - 1)}
                </h3>
              </div>
              <div className="flex mx-auto items-baseline  justify-between">
                <h3 className=" lg:text-xl text-white">Service Fee</h3>
                <h4 className=" text-xs   lg:text-sm text-white">
                  60 x {this.state.selectedSeats.length - 1}
                </h4>
                <h3 className=" lg:text-xl text-white">
                  {60 * (this.state.selectedSeats.length - 1)}
                </h3>
              </div>
            </div>
            <div className="flex mx-auto justify-between items-baseline lg:text-xl  text-white">
              <h3 className=" font-semibold">Grand Total</h3>
              <h3 className=" font-semibold lg:text-xl">
                {this.state.theaterDetails.price *
                  (this.state.selectedSeats.length - 1) +
                  60 * (this.state.selectedSeats.length - 1)}
              </h3>
            </div>
          </div>
          {/* checkout button */}
          <div className="content-center mx-4 mt-4 lg:w-4/12 lg:mt-0">
            <button
              type="button"
              className="w-full uppercase text-xs tracking-wider text-white font-semibold rounded-sm py-2 shadow-lg lg:w-8/12 lg:py-5 lg:text-sm text-logoColor bg-white"
              onClick={this.launchRazorPay}
            >
              Pay Securely <i className="fas fa-lock"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SeatsComp);
