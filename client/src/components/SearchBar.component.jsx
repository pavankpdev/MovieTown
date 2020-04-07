import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import { searchMovies } from "../redux/reducers/searchMoviesReducer/searchMovies.action";
class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      input_string: "",
      loading: false,
    };
    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.onclickSearch = this.onclickSearch.bind(this);
  }

  onChangeInputValue(e) {
    this.setState({ input_string: [e.target.value] });
  }
  onclickSearch(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const string = {
      search_string: this.state.input_string,
    };
    this.props.searchMovies(string);
  }

  render() {
    return (
      <div className="flex items-baseline justify-center">
        <div className=" -ml-4 my-3  md:ml-0 md:my-0 lg:ml-0 lg:my-0">
          <div className="pt-2 relative text-gray-600 mr-12">
            <input
              className="border w-64 border-logoColor bg-white h-10 px-8 pr-16 rounded-lg text-sm focus:outline-none "
              type="search"
              id="search"
              name="search"
              placeholder="Search"
              value={this.state.input_string}
              onChange={this.onChangeInputValue}
            />
            <button
              type="button"
              className="absolute right-0 top-0 mt-5 mr-6 md:mr-6 lg:mr-4"
              onClick={this.onclickSearch}
            >
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                xml="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="-ml-10">
          <BeatLoader size={8} color={"#5a67d8"} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchedMovie: state.searchedMovies,
});

export default connect(mapStateToProps, { searchMovies })(SearchBar);
