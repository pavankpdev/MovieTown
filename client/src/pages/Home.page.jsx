import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar.components";
import PopularMovieCard from "../components/PopularMovie.component";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      nowPlayingMovie: [],
      upcomingMovies: [],
      popularMovies: []
    };
    this.TMDB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
    this.TMDB_IMAGE_WIDTH = "original";
  }

  // async function to make GET request to backend to get all nowplaying, upcoming & popular movies data
  async GetMoviesApicall() {
    try {
      const { data } = await axios.get(`http://localhost:4000/`);
      // storing all the movies details returned from server in state
      this.setState(
        {
          nowPlayingMovie: data.nowplayingmoviesData.results,
          upcomingMovies: data.upComingMoviesData.results,
          popularMovies: data.popularMoviesData.results
        },
        () => {
          console.log(this.state.popularMovies);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // GET request made everytime the component mounts
  componentDidMount() {
    this.GetMoviesApicall();
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.popularMovies.map(data => (
          <PopularMovieCard
            imageUrl={this.TMDB_IMAGE_BASE_URL}
            imageWidth={this.TMDB_IMAGE_WIDTH}
            imagePath={data.poster_path}
          />
        ))}
      </div>
    );
  }
}

export default HomePage;
