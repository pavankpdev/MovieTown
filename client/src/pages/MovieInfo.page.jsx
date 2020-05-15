import React, { Component } from "react";
import { connect } from "react-redux";

import { getMovieInfo } from "../redux/reducers/movieInfoReducer/movieInfo.action";
import MoviesInfoWrapper from "../components/wrappers/MoviesInfoWrapper.component";
class MovieInfo extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      localMovie: [],
    };
  }

  componentDidMount() {
    // getting data from localStorage and saving to state to hold the movieInfo in the session
    setTimeout(() => {
      this.setState(
        {
          localMovie: new Array(JSON.parse(localStorage.selectedMovie)),
        },
        () => {}
      );
    }, 3000);
  }

  render() {
    return (
      <div>
        <MoviesInfoWrapper
          list={this.state.localMovie}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedMovieRedux: state.localMovie.selectedMovie,
  error: state.errors,
});

export default connect(mapStateToProps, { getMovieInfo })(MovieInfo);
