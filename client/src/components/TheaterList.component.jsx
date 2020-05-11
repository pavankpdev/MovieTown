import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class TheaterList extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
    };
    this.onClickTime = this.onClickTime.bind(this);
  }

  onClickTime(e) {
    this.setState({ time: e.target.id }, () => {});
  }

  render() {
    return (
      <div className="mx-4 mt-4">
        <div className="text-xs tracking-wide text-teal-500 font-semibold lg:text-sm ">
          2km Away
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg lg:text-2xl">{this.props.name}</h3>
            <h6 className="text-xs w-48 truncate md:w-full lg:w-full lg:text-sm xl:w-full">
              {this.props.location}
            </h6>
            <div className="mt-2 flex justify-start items-center">
              {this.props.facilities.map((facility) => (
                <img src={facility} />
              ))}
            </div>
            <div className="mt-2">
              {this.props.time.map((time) => (
                <button
                  id={time}
                  onClick={this.onClickTime}
                  className={
                    this.state.time === time
                      ? "mr-1 text-xs text-white bg-teal-500 border border-teal-500 px-2 py-1 rounded focus:outline-none lg:text-sm lg:font-semibold"
                      : "mr-1 text-xs text-teal-500 border border-teal-500 px-2 py-1 rounded hover:bg-teal-500 hover:text-white focus:outline-none lg:text-sm lg:font-semibold"
                  }
                >
                  {time}
                </button>
              ))}
            </div>
            <div>
              <Link
                to={{
                  pathname: "/movies/seats",
                  state: {
                    theaterDetails: {
                      name: this.props.name,
                      location: this.props.location,
                      time: this.state.time,
                      price: this.props.price,
                      type: this.props.type,
                      date: this.props.date,
                      month: this.props.month,
                    },
                  },
                }}
              >
                <button
                  id={this.props.id}
                  className="mt-1  py-2 text-xs text-logoColor font-semibold lg:text-sm"
                >
                  Select Seats <i className="fas fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="font-semibold text-lg lg:text-2xl">₹{this.props.price}</div>
        </div>
      </div>
    );
  }
}
export default TheaterList;
