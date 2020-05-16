import React, { Component } from "react";

import SearchedMovieCardWrapper from "../components/wrappers/SearchedMovieCardWrapper.component";
import SearchBar from "../components/SearchBar.component";
class SearchMovies extends Component {
  constructor() {
    super();
    this.state = {
      searchedMovies: [],
    };
  }

  componentDidMount() {
    if (!localStorage.searchedMovies)
      return console.log("something went wrong");

    this.setState(
      {
        searchedMovies: JSON.parse(localStorage.searchedMovies),
      },
      () => {}
    );
  }

  render() {
    return (
      <div>
        <div className="mt-6 text-xl text-teal-500 font-semibold tracking-wider lg:text-2xl">
          <center>
            <h2>{`We recieved total ${this.state.searchedMovies.length} results`}</h2>
          </center>
        </div>
        <SearchedMovieCardWrapper source={this.state.searchedMovies} />
      </div>
    );
  }
}

export default SearchMovies;
