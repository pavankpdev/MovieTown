import React, { Component } from "react";
import axios from "axios";

import TrendingMovies from "../components/TrendingMovieCard.component";
import PropularMoviesWrapper from "../components/PopularMoviesWrapper.components";
import "./styles/Home.styles.css";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      nowPlayingMovie: [],
      upcomingMovies: [],
      popularMovies: [],
      trendingMovies: [],
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
          popularMovies: data.popularMoviesData.results,
          trendingMovies: data.trendingMoviesData
        },
        () => {
          console.log(this.state.trendingMovies);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // GET request made everytime the component mounts/starts
  componentDidMount() {
    this.GetMoviesApicall();
  }

  // Function fired when right arrow button clicked
  onClickArrowRight() {
    this.setState({
      tranlateProperty:
        this.state.tranlateProperty === 100
          ? 0
          : this.state.tranlateProperty + 100 / this.state.popularMovies.length
    });
  }

  // Function fired when left arrow button clicked
  onClickArrowLeft() {
    this.setState({
      tranlateProperty:
        this.state.tranlateProperty === 0
          ? 0
          : this.state.tranlateProperty - 100 / this.state.popularMovies.length
    });
  }

  render() {
    return (
      <div>
        <div>
          <PropularMoviesWrapper
            tranlateProperty={this.state.tranlateProperty}
            imageUrl={this.TMDB_IMAGE_BASE_URL}
            imageWidth={this.TMDB_IMAGE_WIDTH}
            list={this.state.popularMovies}
            onClickArrowRight={this.onClickArrowRight}
            onClickArrowLeft={this.onClickArrowLeft}
          />
        </div>

        <div className="absolute trendingCard">
          <h2 className="ml-4 text-3xl text-headingColor font-bold content-center">
            Trending Now
          </h2>
          <div className="mt-10 lg:ml-8 lg:flex">
            {this.state.trendingMovies.map(data => {
              return (
                <TrendingMovies
                  imageURL={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}${data.poster_path}`}
                  title={data.title}
                  rating={data.vote_average}
                  lan={data.original_language}
                  genre={data.genres[0].name}
                  certificate={data.adult}
                  production={data.production_companies[0].name}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
