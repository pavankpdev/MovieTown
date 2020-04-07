import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getMovieInfo } from "../redux/reducers/movieInfoReducer/movieInfo.action";
import MoviesInfoWrapper from "../components/wrappers/MoviesInfoWrapper.component";
class MovieInfo extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      errors: {},
      localMovie: [],
    };
  }

  async componentDidMount() {
    // getting data from localStorage and saving to state to hold the movieInfo in the session
    setTimeout(() => {
      this.setState(
        {
          localMovie: new Array(JSON.parse(localStorage.selectedMovie)),
        },
        () => {}
      );
    }, 3000);
    let dataToState = [];

    // loop to get and random users info and comments from api endpoints
    for (let i = 1; i <= 3; i++) {
      // axios call to get random user info from randomuser.me
      const users = await axios.get("https://randomuser.me/api/");
      // axios call to get random comment from jsonplaceholder
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?id=${`${i}`}`
      );
      // generating random JS object templates to feed the components
      const template = {
        user: `${users.data.results[0].name.title} ${users.data.results[0].name.first} ${users.data.results[0].name.last}`,
        avatar: `${users.data.results[0].picture.thumbnail}`,
        comments: `${data[0].body}`,
      };
      dataToState.push(template);
    }
    // saving the template to state
    this.setState({ comments: dataToState }, () => {});
  }

  render() {
    return (
      <div>
        <MoviesInfoWrapper
          list={this.state.localMovie}
          comments={this.state.comments}
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
