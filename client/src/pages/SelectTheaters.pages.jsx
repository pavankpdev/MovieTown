import React, { Component } from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";

import SelectTheaterComp from "../components/SelectTheater.component";

class SelectTheater extends Component {
  constructor() {
    super();
    this.state = {
      theaters: [],
      selectedMovie: [],
      zip: "",
      search: false,
    };

    this.setZipCode = this.setZipCode.bind(this);
    this.setTheater = this.setTheater.bind(this);
  }

  setZipCode(e) {
    this.setState({ zip: e.target.value }, () => console.log(this.state.zip));
  }
  setTheater(data) {
    console.log(data);
    this.setState({ theaters: data.data });
  }
  //   fetching theater details from theater API and selected movie from localStorage
  componentDidMount() {
    this.setState(
      {
        selectedMovie: JSON.parse(localStorage.selectedMovie),
      },
      () => {}
    );
    swal(
      <div>
        <center>
          <img
            className="w-8/12"
            src="https://i.ibb.co/c6Y4QV4/kingdom-3.png"
            alt={"search"}
          />
          <h1 className="text-lg text-headingColor font-bold lg:text-xl">
            Hello there! please provide your zip code or postal code, to search
            theaters nearby.
          </h1>
          <input
            type="text"
            name="zip"
            id="fullName"
            placeholder="Eg: 560023"
            onChange={this.setZipCode}
            required
            className="border border-logoColor rounded-lg py-4 px-2 mt-3 bg-transparent ml-2 text-xs w-48 h-6 focus:outline-none lg:text-sm lg:w-4/5 lg:h-8"
          />
        </center>
      </div>,
      {
        buttons: {
          catch: {
            text: "Search",
            value: "Search",
          },
        },
      }
    ).then((value) => {
      switch (value) {
        case "Search":
          if (this.state.zip === "") {
            return swal(
              <div>
                <center>
                  <img
                    className="w-8/12"
                    src="https://i.ibb.co/vJL5fvc/mirage-come-back-later.png"
                    alt={"error"}
                  />
                  <h1 className="text-lg text-headingColor font-bold lg:text-xl">
                    ZipCode connot be empty!
                  </h1>
                </center>
              </div>
            );
          }
          axios
            .get(`/movies/theaters/${this.state.zip}`)
            .then((data) => this.setTheater(data))
            .catch((err) => alert(err));
          break;
        default:
          swal("Something went wrong!");
      }
    });
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
