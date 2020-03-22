import React, { Component } from "react";
import axios from "axios";

import TrendingMoviesWrapper from "../components/wrappers/TendingMovieWrapper.component";
import PropularMoviesWrapper from "../components/wrappers/PopularMoviesWrapper.components";
import NowPlaying from "../components/NowPlayingMovies.component";
import "./styles/Home.styles.css";
import NowPlayingMovies from "../components/NowPlayingMovies.component";
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
    this.clickFuntion = this.clickFuntion.bind(this);
  }

  // async function to make GET request to backend to get all nowplaying, upcoming & popular movies data
  async GetMoviesApicall() {
    try {
      const { data } = await axios.get(`http://localhost:4000/`);
      // storing all the movies details returned from server in state
      this.setState(
        {
          nowPlayingMovie: data.nowplayingmoviesData,
          upcomingMovies: data.upComingMoviesData,
          popularMovies: data.popularMoviesData,
          trendingMovies: data.trendingMoviesData
        },
        () => {
          console.log(this.state.nowPlayingMovie);
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

  clickFuntion() {
    console.log("clicked kp");
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
            clickFuntion={this.clickFuntion}
          />
        </div>

        <div className="absolute trendingCard">
          <h2 className="ml-4 text-2xl text-headingColor font-bold content-center lg:text-3xl">
            Trending Now
          </h2>
          <div className="mt-10 mx-6 lg:mx-3 lg:ml-8 lg:flex">
            <TrendingMoviesWrapper
              trendingMoviesData={this.state.trendingMovies}
              imageURL={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}`}
            />
          </div>
        </div>
        <div className="absolute nowPlayingCard">
          <h2 className="ml-4 text-2xl text-headingColor font-bold content-center lg:text-3xl">
            Now Playing In Theaters
          </h2>
          <div className="mt-8 lg:flex lg:flex-wrap lg:-mb-4 lg:justify-center">
            {this.state.nowPlayingMovie.map(data => {
              let { production_companies, genres } = data;

              production_companies =
                production_companies.length !== 0
                  ? production_companies[0].name
                  : "Team Effort";

              genres = genres.length !== 0 ? genres[0].name : "drama";
              return (
                <NowPlayingMovies
                  key={data.id}
                  image={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}${data.poster_path}`}
                  title={data.title}
                  production={production_companies}
                  lan={data.original_language}
                  genre={genres}
                  certificate={data.adult}
                  ratingsAvg={data.vote_average}
                  ratingsTotal={data.vote_count}
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
