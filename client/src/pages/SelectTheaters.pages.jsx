import React, { Component } from "react";
import axios from "axios";

import SelectTheaterComp from "../components/SelectTheater.component";

class SelectTheater extends Component {
  constructor() {
    super();
    this.state = {
      theaters: [],
      selectedMovie: [],
    };
  }

  //   fetching theater details from theater API and selected movie from localStorage
  componentDidMount() {
    try {
      this.setState(
        {
          selectedMovie: JSON.parse(localStorage.selectedMovie),
        },
        () => {}
      );
      let userloc = "";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords);

          userloc = `${position.coords.latitude},${position.coords.longitude}`;
        });
      } else {
        console.error("Geolocation is not supported by this browser!");
      }

      setTimeout(async () => {
        const theaters = await axios.get(`/movies/theaters/${userloc}`);
        if (!theaters.data) return console.log("error fetching the data");

        this.setState({
          theaters: theaters.data,
        });
        console.log("state", this.state.theaters);
      }, 1000);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    let production =
      this.state.selectedMovie.production_companies !== undefined
        ? this.state.selectedMovie.production_companies[0].name
        : "team effort";

    let genre =
      this.state.selectedMovie.genres !== undefined
        ? this.state.selectedMovie.genres[0].name
        : "drama";

    // date module
    let date = new Date();

    // month list
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    let month = date.getMonth();
    let currentDate = date.getDate();
    console.log(this.state.selectedMovie);
    return (
      <div>
        <SelectTheaterComp
          source={this.state.selectedMovie}
          genre={genre}
          production={production}
          month={months[month]}
          currentDate={currentDate}
          theaterlist={this.state.theaters}
        />
      </div>
    );
  }
}
export default SelectTheater;
