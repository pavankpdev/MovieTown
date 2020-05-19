import React from "react";
import ReactPlayer from "react-player";

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
      theaters: [],
    };
    this.dateButtonClick = this.dateButtonClick.bind(this);
    this.setSource = this.setSource.bind(this);
  }
  dateButtonClick(e) {
    this.setState({ clicked: Number(e.target.id) });
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
    this.setState({
      clicked: this.props.currentDate,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ theaters: nextProps.theaterlist });
    }
    console.log(nextProps);
  }
  render() {
    const image = "https://image.tmdb.org/t/p/original";
    return (
      <div>
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
                </div>
              </div>

              {/* Theaters */}
              <div className="h-3/6 overflow-x-hidden overflow-y-auto lg:mx-5">
                {this.state.theaters !== undefined ? (
                  this.state.theaters.map((theater) => (
                    <TheaterList
                      key={Math.random()}
                      id={theater.theater_id}
                      name={theater.theater_name}
                      location={theater.location}
                      time={theater.time}
                      facilities={theater.facilities}
                      price={theater.price}
                      type={theater.type[0]}
                      date={this.state.clicked}
                      month={this.props.month}
                      travel={theater.travel_time}
                      distance={theater.distance}
                    />
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTheater;
