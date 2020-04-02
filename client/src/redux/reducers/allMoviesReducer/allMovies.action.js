import axios from "axios";
import { GET_ALL_MOVIES } from "./allMovies.types";
import { GET_ERROR } from "../errorReducer/error.types";
// async function to make GET request to backend to get all nowplaying, upcoming, popular & trending movies data
export const getAllmovies = () => async dispatch => {
  try {
    const { data } = await axios.get(
      `http://localhost:${process.env.PORT ? process.env.PORT : 4000}/home`
    );

    // maping through the upcoming movie objects to add interested property
    data.upComingMoviesData.map(
      obj => (obj.interested = Math.floor(Math.random() * 76) + 25)
    );

    // storing all the movies details returned from server in the redux store
    dispatch({
      type: GET_ALL_MOVIES,
      payload: {
        popularMovies: data.popularMoviesData,
        nowPlayingMovies: data.nowplayingmoviesData,
        trendingMovies: data.trendingMoviesData,
        upComingMovies: data.upComingMoviesData
      }
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: `allmovies ${error}`
    });
  }
};
