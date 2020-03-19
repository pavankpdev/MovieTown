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
      const { data } = await axios.get(`http://localhost:4000/`);
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
        <div className="mt-6">
          <div className="mx-3 relative shadow-2xl">
            <img
              className="h-48 mx-auto rounded-lg w-full md:h-64 lg:h-pc lg:rounded-extendedcorner xl:h-pc xl:rounded-extendedcorner"
              src={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}${this.state.popularMovies.poster_path}`}
              // src="https://cdn.pixabay.com/photo/2020/03/18/20/01/frankfurt-4945405_960_720.jpg"
              // src="https://cdn.pixabay.com/photo/2020/03/12/17/29/tiger-4925778_960_720.jpg"
              alt="popular movie"
            />
            <div
              className="bg-white uppercase font-semibold text-xs text-logoColor tracking-widest px-2 py-1 rounded-full"
              style={{ position: "absolute", top:"8px", left:"6px" }}
            >
              <i className="fas fa-star fa-md"></i> Most popular
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
