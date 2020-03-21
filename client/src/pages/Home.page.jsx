import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar.components";
import PopularMovieCard from "../components/PopularMovie.component";
import "./styles/Home.styles.css";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      nowPlayingMovie: [],
      upcomingMovies: [],
      popularMovies: [],
      tranlateProperty: 0
    };
    this.TMDB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
    this.TMDB_IMAGE_WIDTH = "original";
    this.count = 0;
    this.onClickArrowLeft = this.onClickArrowLeft.bind(this);
    this.onClickArrowRight = this.onClickArrowRight.bind(this);
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

  onClickArrowRight() {
    if (this.state.tranlateProperty === 100) {
      return this.setState(
        {
          tranlateProperty: 0
        },
        () => {
          console.log(this.state.tranlateProperty);
        }
      );
    } else {
      return this.setState(
        {
          tranlateProperty:
            this.state.tranlateProperty + 100 / this.state.popularMovies.length
        },
        () => {
          console.log(this.state.tranlateProperty);
        }
      );
    }
  }
  onClickArrowLeft() {
    this.setState({
      tranlateProperty:
        this.state.tranlateProperty - 100 / this.state.popularMovies.length
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="cards-slider sm:ml-2 md:ml-4 lg:ml-2 xl:ml-2">
          <div
            className="cards-slider-wrapper"
            style={{
              transform: `translateX(-${this.state.tranlateProperty}%)`
            }}
          >
            {this.state.popularMovies.map(data => (
              <PopularMovieCard
                key={this.count++}
                imageUrl={this.TMDB_IMAGE_BASE_URL}
                imageWidth={this.TMDB_IMAGE_WIDTH}
                imagePath={data.poster_path}
              />
            ))}
          </div>
        </div>
        <div className="arrow-btns">
          <button
            className="arrow-left hover:text-blue-900  focus:outline-none"
            onClick={this.onClickArrowLeft}
          >
            <i className="far fa-arrow-alt-circle-left  fa-2x  "></i>
          </button>
          <button
            className="arrow-right  hover:text-blue-900 focus:outline-none"
            onClick={this.onClickArrowRight}
          >
            <i className="far fa-arrow-alt-circle-right   fa-2x "></i>
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
