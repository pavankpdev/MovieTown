import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllmovies } from "../redux/reducers/allMoviesReducer/allMovies.action";
import SearchBar from "../components/SearchBar.component";

import TrendingMoviesWrapper from "../components/wrappers/TendingMovieWrapper.component";
import PropularMoviesWrapper from "../components/wrappers/PopularMoviesWrapper.components";
import NowPlayingMoviesWrapper from "../components/wrappers/NowPlayingMoviesWrapper.component";
import UpcomingMoviesWrapper from "../components/wrappers/UpcomingMoviesWrapper.component";
import "./styles/Home.styles.css";
class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      nowPlayingMovie: [],
      upcomingMovies: [],
      popularMovies: [],
      trendingMovies: [],
      tranlateProperty: 0,
      error: {},
    };
    this.TMDB_IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";
    this.TMDB_IMAGE_WIDTH = "original";
    this.count = 0;
    this.onClickArrowLeft = this.onClickArrowLeft.bind(this);
    this.onClickArrowRight = this.onClickArrowRight.bind(this);
  }

  // GET request made everytime the component mounts/starts
  componentDidMount() {
    // calling redux action to get the movies from store and save it to the state
    this.props.getAllmovies();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        error: nextProps.error ? nextProps.error : null,
        nowPlayingMovie: nextProps.nowPlayingMoviesRedux,
        upcomingMovies: nextProps.upComingMoviesRedux,
        popularMovies: nextProps.popularMoviesRedux,
        trendingMovies: nextProps.trendingMoviesRedux,
      });
    }
  }

  // Function fired when right arrow button clicked
  onClickArrowRight() {
    this.setState({
      tranlateProperty:
        this.state.tranlateProperty === 100
          ? 0
          : this.state.tranlateProperty + 100 / this.state.popularMovies.length,
    });
  }

  // Function fired when left arrow button clicked
  onClickArrowLeft() {
    this.setState({
      tranlateProperty:
        this.state.tranlateProperty === 0
          ? 0
          : this.state.tranlateProperty - 100 / this.state.popularMovies.length,
    });
  }

  render() {
    return (
      <div>
        <div className="mx-auto">
          <SearchBar />
        </div>
        <div>
          <PropularMoviesWrapper
            tranlateProperty={this.state.tranlateProperty}
            image={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}`}
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
          <div className="mt-10 mx-6 md:flex md:-mb-4 md:flex-wrap md:justify-center lg:mx-3 lg:flex">
            <TrendingMoviesWrapper
              trendingMoviesData={this.state.trendingMovies}
              imageURL={`${this.TMDB_IMAGE_BASE_URL}/w400`}
            />
          </div>
        </div>

        <div className="absolute nowPlayingCard">
          <h2 className="ml-4 text-2xl text-headingColor font-bold content-center lg:text-3xl">
            Now Playing In Theaters
          </h2>
          <div className="mt-8 md:mx-3 md:flex md:flex-wrap md:-mb-4 lg:flex lg:flex-wrap lg:-mb-4 lg:justify-center">
            <NowPlayingMoviesWrapper
              source={this.state.nowPlayingMovie}
              image={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}`}
            />
          </div>
          <center>
            <button
              type="button"
              className="mt-4 px-6 bg-logoColor text-white text-xs font-semibold py-2 uppercase tracking-wider rounded-md hover:bg-white hover:border-2 hover:border-logoColor hover:text-logoColor"
            >
              load more
            </button>
          </center>
        </div>

        <div className="absolute upComingCard">
          <h2 className="ml-4 text-2xl text-headingColor font-bold content-center lg:text-3xl">
            Upcoming Movies
          </h2>

          <div className="mt-8 md:mx-3 md:flex md:flex-wrap md:-mb-4 lg:flex lg:flex-wrap lg:-mb-4 lg:justify-center">
            <UpcomingMoviesWrapper
              source={this.state.upcomingMovies}
              image={`${this.TMDB_IMAGE_BASE_URL}${this.TMDB_IMAGE_WIDTH}`}
            />
          </div>
          <center>
            <button
              type="button"
              className="mt-4 px-6 bg-logoColor text-white text-xs font-semibold py-2 uppercase tracking-wider rounded-md lg:ml-24 hover:bg-white hover:border-2 hover:border-logoColor hover:text-logoColor"
            >
              load more
            </button>
          </center>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  popularMoviesRedux: state.allMovies.popularMovies,
  nowPlayingMoviesRedux: state.allMovies.nowPlayingMovies,
  trendingMoviesRedux: state.allMovies.trendingMovies,
  upComingMoviesRedux: state.allMovies.upComingMovies,
});

export default connect(mapStateToProps, { getAllmovies })(HomePage);
