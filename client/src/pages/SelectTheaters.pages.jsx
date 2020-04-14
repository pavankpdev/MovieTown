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
  async componentDidMount() {
    try {
      const theaters = await axios.get("/movies/booktickets");
      if (!theaters.data) return console.log("error fetching the data");

      this.setState({
        theaters: theaters.data.theatersInfo,
        selectedMovie: JSON.parse(localStorage.selectedMovie),
      });
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
