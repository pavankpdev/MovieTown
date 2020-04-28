import React from "react";
import ReactPlayer from "react-player";
import BeatLoader from "react-spinners/BeatLoader";

import TheaterList from "./TheaterList.component";
import "./styles/SelectTheater.styles.css";
import { Component } from "react";
class SelectTheater extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      sourceState: "invalid_key",
      clicked: "",
      filterbtn: false,
      price: "",
      filters: [],
      loading: false,
    };
    this.dateButtonClick = this.dateButtonClick.bind(this);
    this.setSource = this.setSource.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.saveFilter = this.saveFilter.bind(this);
    this.setCustomFilters = this.setCustomFilters.bind(this);
  }
  onChangePrice(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: [e.target.value] });
  }
  dateButtonClick(e) {
    this.setState({ clicked: Number(e.target.id) });
  }
  setFilter() {
    this.setState({
      filterbtn: this.state.filterbtn ? false : true,
      loading: false,
    });
  }
  setCustomFilters(e) {
    this.state.filters.includes(e.target.id)
      ? this.state.filters.splice(this.state.filters.indexOf(e.target.id), 1)
      : this.setState({ filters: [...this.state.filters, e.target.id] });
  }
  saveFilter() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ filterbtn: false, loading: false });
    }, 4000);
  }
  setSource() {
    setTimeout(() => {
      this.setState({
        sourceState:
          this.props.source.videos !== undefined
            ? this.props.source.videos.results[0].key
            : this.state.sourceState,
      });
    }, 3000);
  }

  componentDidMount() {
    this.setSource();
    this.setState({ clicked: this.props.currentDate });
  }

  render() {
    const image = "https://image.tmdb.org/t/p/original";

    return (
      <div>
        {/* filter model */}
        <div
          className={this.state.filterbtn ? "panel w-full shadow-xl" : "hidden"}
        >
          <h1 className="text-headingColor font-semibold text-lg tracking-widest">
            Filters
          </h1>
          <div className="bg-white w-full  p-4">
            {/* time */}
            <div>
              <h1 className="text-headingColor font-semibold text-sm tracking-widest">
                Time:
                <span className="text-gray-500 text-tiny uppercase tracking-wider">
                  (you can select multiple options)
                </span>
              </h1>
              <div className="text-teal-400 text-xs flex items-center mt-2">
                <button
                  onClick={this.setCustomFilters}
                  id="09:00"
                  className={
                    this.state.filters.includes("09:00")
                      ? "mr-1 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mr-1 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  09:00
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="12:00"
                  className={
                    this.state.filters.includes("12:00")
                      ? "mr-1 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mr-1 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  12:00
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="16:00"
                  className={
                    this.state.filters.includes("16:00")
                      ? "mr-1 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mr-1 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  16:00
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="22:00"
                  className={
                    this.state.filters.includes("22:00")
                      ? "mr-1 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mr-1 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  22:00
                </button>
              </div>
            </div>
            {/* facilities */}
            <div className="mt-3">
              <h1 className="text-headingColor font-semibold text-sm tracking-widest">
                Facilities:{" "}
                <span className="text-gray-500 text-tiny uppercase tracking-wider">
                  (you can select multiple options)
                </span>
              </h1>
              <div className="text-teal-400 text-xs flex flex-wrap mb-3 mt-2">
                <button
                  onClick={this.setCustomFilters}
                  id="Dolby"
                  className={
                    this.state.filters.includes("Dolby")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 rounded-extendedcorner font-semibold text-white md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded-extendedcorner font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  Dolby
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="Wheelchair"
                  className={
                    this.state.filters.includes("Wheelchair")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 rounded-extendedcorner font-semibold text-white md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded-extendedcorner font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  Wheelchair
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="Recliner Seats"
                  className={
                    this.state.filters.includes("Recliner Seats")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 rounded-extendedcorner font-semibold text-white md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded-extendedcorner font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  Recliner Seats
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="Food and Beverages"
                  className={
                    this.state.filters.includes("Food and Beverages")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 rounded-extendedcorner font-semibold text-white md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded-extendedcorner font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  Food and Beverages
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="Wi-Fi"
                  className={
                    this.state.filters.includes("Wi-Fi")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 rounded-extendedcorner font-semibold text-white md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded-extendedcorner font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  Wi-Fi
                </button>
              </div>
            </div>
            {/* Screens */}
            <div className="mt-3">
              <h1 className="text-headingColor font-semibold text-sm tracking-widest">
                Screens:{" "}
                <span className="text-gray-500 text-tiny uppercase tracking-wider">
                  (you can select multiple options)
                </span>
              </h1>
              <div className="text-teal-400 text-xs flex flex-wrap mb-3 mt-2">
                <button
                  onClick={this.setCustomFilters}
                  id="Classic"
                  className={
                    this.state.filters.includes("Classic")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  Classic
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="INOX"
                  className={
                    this.state.filters.includes("INOX")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  INOX
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="PVR"
                  className={
                    this.state.filters.includes("PVR")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  PVR
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="IMAX"
                  className={
                    this.state.filters.includes("IMAX")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  IMAX
                </button>
                <button
                  onClick={this.setCustomFilters}
                  id="4DX"
                  className={
                    this.state.filters.includes("4DX")
                      ? "mt-2 mr-2 px-2 py-1 border bg-teal-400 text-white rounded font-semibold md:px-3"
                      : "mt-2 mr-2 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
                  }
                >
                  4DX
                </button>
              </div>
            </div>
            {/* Screens */}
            <div className="mt-3">
              <h1 className="text-headingColor font-semibold text-sm tracking-widest">
                Price: <span>{this.state.price}</span>
              </h1>
              <div className="">
                <input
                  type="range"
                  name="price"
                  id="price"
                  onChange={this.onChangePrice}
                  min="100"
                  max="300"
                  step="50"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-teal-400 text-xs flex items-center mt-2">
              <button
                onClick={this.setFilter}
                className="mr-1 px-3 py-2 text-gray-900 font-semibold md:px-3  focus:outline-none"
              >
                Close
              </button>
              <button
                onClick={this.saveFilter}
                className="mr-1 px-3 py-2 text-white bg-logoColor rounded font-semibold md:px-3 hover:boder-2 focus:bg-teal-400 focus:text-white focus:outline-none"
              >
                Save{" "}
              </button>
              <span
                className={
                  this.state.loading
                    ? "text-xs text-teal-500 font-semibold uppercase tracking-wider"
                    : "hidden   "
                }
              >
                applying filter
                <BeatLoader
                  size={8}
                  color={"#38b2ac"}
                  loading={this.state.loading}
                />
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.toggle
              ? "panel flex items-top  sm:block md:hidden lg:hidden xl:hidden"
              : "hidden panel"
          }
        >
          <center>
            <ReactPlayer
              width="40"
              height="10"
              url={`https://www.youtube.com/watch?v=${this.state.sourceState}`}
              controls
            />
            <button
              type="button"
              onClick={() => this.setState({ toggle: false })}
            >
              <i className="fas fa-times-circle fa-lg"></i>
            </button>
          </center>
        </div>
        <div
          className={
            this.state.toggle
              ? "panel flex justify-between sm:hidden md:block lg:block xl:block"
              : "hidden panel"
          }
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${this.state.sourceState}`}
            controls
          />
          <button
            type="button"
            onClick={() => this.setState({ toggle: false })}
          >
            <i className="fas fa-times-circle fa-2x"></i>
          </button>
        </div>
        <div
          className={
            this.state.toggle || this.state.filterbtn
              ? " select-teater_backdropParent w-screen h-screen overflow-hidden"
              : "w-screen h-screen overflow-hidden"
          }
        >
          <div>
            {/* Images */}
            <div className="absolute bg-black w-full opacity-50 select-teater_backdropOverlay md:w-full">
              <center>
                <button
                  className="hover:text-white focus:outline-none"
                  onClick={() => this.setState({ toggle: true })}
                >
                  <i className="fas fa-play-circle text-white fa-3x mt-16 md:mt-24 lg:mt-48"></i>
                </button>
              </center>
            </div>
            <img
              className="w-full select-teater_backdropImage"
              src={
                this.props.source.backdrop_path !== null
                  ? `${image}${this.props.source.backdrop_path}`
                  : "https://i.ibb.co/pvBcssg/backdrop.png"
              }
              alt="backdrop select-teater_poster"
            />
          </div>
          <div className="absolute w-2/6 ml-2  border-4 border-white rounded-lg shadow select-teater_poster md:w-1/5 md:ml-4 lg:w-1/6 lg:ml-4 lg:rounded-extendedcorner">
            <img
              className=" rounded-lg shadow-2xl lg:rounded-extendedcorner"
              src={
                this.props.source.poster_path !== null
                  ? `${image}${this.props.source.poster_path}`
                  : "https://i.ibb.co/6ntQSKt/select-teater_poster.png"
              }
              alt="select-teater_poster"
            />
          </div>
          {/* overview details */}
          <div className="absolute mx-2 text-white select-teater_overviewDetails">
            <div className="flex sm:justify-between items-baseline md:justify-start">
              <div className=" text-center block">
                <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                  {this.props.source.release_date}
                </h4>

                <h4 className="text-tiny tracking-widest">Release Data</h4>
              </div>
              <div className="ml-3 text-center lg:ml-8">
                <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                  {this.props.source.vote_average}
                </h4>

                <div className="flex text-tiny">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="ml-3 text-center lg:ml-8">
                <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                  {this.props.source.runtime !== 0
                    ? this.props.source.runtime
                    : 120}
                </h4>

                <h4 className="text-tiny tracking-widest">Minutes</h4>
              </div>
            </div>
          </div>

          {/* selection section */}
          <div>
            {/* bg card */}
            <div className="bg-white w-screen h-screen absolute theater-card">
              <div className="flex justify-between items-center mx-4 lg:mx-10 lg:mt-6">
                {/* title and info */}
                <div className="text-headingColor mt-4 ">
                  <h2 className=" text-lg font-bold uppercase tracking-wider lg:text-2xl pt-3">
                    {this.props.source.title}
                  </h2>
                  <h3 className="uppercase text-xs text-gray-600 font-semibold pt-2 lg:text-sm lg:w-full">
                    {this.props.production}
                  </h3>
                  <h3 className="w-40 uppercase text-xs text-gray-600 font-semibold -pt-1  lg:text-sm">
                    {this.props.source.original_language} &#8226;{" "}
                    {this.props.genre} &#8226; UA
                  </h3>
                </div>
              </div>
              {/* date */}
              <div className="flex justify-between items-center mt-8 mx-4 w-screen overflow-x-auto md:justify-center">
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate}>
                      {this.props.currentDate}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 1
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 1}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 1}>
                      {this.props.currentDate + 1}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 2
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 2}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 2}>
                      {this.props.currentDate + 2}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 3
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 3}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 3}>
                      {this.props.currentDate + 3}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 4
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 4}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 4}>
                      {this.props.currentDate + 4}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 5
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 5}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 5}>
                      {this.props.currentDate + 5}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 6
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 6}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 6}>
                      {this.props.currentDate + 6}
                    </h5>
                  </div>
                </button>
                <button
                  onClick={this.dateButtonClick}
                  className="hover:outline-none focus:outline-none ml-3"
                >
                  <div
                    className={
                      this.state.clicked === this.props.currentDate + 7
                        ? ` text-center font-semibold px-2 text-white text-sm border-2 border-logoColor bg-logoColor rounded-md`
                        : ` text-center font-semibold px-2`
                    }
                  >
                    <h3 className="uppercase" id={this.props.currentDate + 7}>
                      {this.props.month}
                    </h3>
                    <h5 id={this.props.currentDate + 7}>
                      {this.props.currentDate + 7}
                    </h5>
                  </div>
                </button>
              </div>
              <div className="mx-4 my-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-500 md:text-sm lg:text-sm xl:text-sm">
                    Select a theater from the list
                  </h3>
                  <button
                    className="text-xs font-semibold uppercase text-gray-500 border border-gray-500 px-2 py-1 rounded tracking-wider md:text-sm lg:mr-4 lg:text-sm xl:text-sm"
                    onClick={this.setFilter}
                  >
                    Filter <i className="fas fa-filter"></i>
                  </button>
                </div>
              </div>

              {/* Theaters */}
              <div className="h-3/6 overflow-x-hidden overflow-y-auto">
                {this.props.theaterlist.theaterDB !== undefined
                  ? this.props.theaterlist.theaterDB.map((theater) => (
                      <TheaterList
                        key={Math.random()}
                        id={theater.theater_id}
                        name={theater.theater_name}
                        location={theater.location}
                        time={theater.movies[0].time}
                        facilities={theater.facilities}
                        price={theater.movies[0].price}
                        type={theater.type}
                        date={this.state.clicked}
                        month={this.props.month}
                      />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTheater;
