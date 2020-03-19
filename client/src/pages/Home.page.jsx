import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar.components";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      nowPlayingMovie: {},
      upcomingMovies: {},
      popularMovies: {}
    };
    this.TMDB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
    this.TMDB_IMAGE_WIDTH = "original";
  }
  async GetMoviesApicall() {
    try {
      const { data } = await axios.get(`http://localhost:3800/`);
      this.setState(
        {
          nowPlayingMovie: data.nowplayingmoviesData,
          upcomingMovies: data.upComingMoviesData,
          popularMovies: data.popularMoviesData
        },
        () => console.log(this.state.popularMovies)
      );
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.GetMoviesApicall();
  }

  render() {
    return (
      <div>
        <Navbar />
        {/* Recommended card */}
        <div>
          <div>
            <img
              className=""
              src={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}${this.state.popularMovies.poster_path}`}
              alt="popular movie"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
