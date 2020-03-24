const axios = require("axios");
const router = require("express").Router();

const {
  TMDB_FETCH_MOVIES_BASE_URI,
  TMDB_UPCOMING_MOVIES_URI,
  TMDB_NOW_PLAYING_URI,
  TMDB_POPULAR_MOVIES_URI,
  TMDB_TRENDING_MOVIES_URI,
  TMDB_API_KEY,
  TMDB_REGION,
  TMDB_LANGUAGE
} = require("../../config/keys");

const API_QUERY = `api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}&page=1&region=${TMDB_REGION}`;
let nowPlayingMoviesDataStore = {};
let upcomingMoviesDataStore = {};

// @Route   GET /
// @des     EXTERNAL_API_CALL gets movies information as a json format
// @access  PUBLIC
router.get("/", async (req, res) => {
  try {
    // GET request to fetch all the nowPlaying movie details from TMDB Api with axios
    const nowplayingmovies = await axios.get(
      `${TMDB_FETCH_MOVIES_BASE_URI}${TMDB_NOW_PLAYING_URI}${API_QUERY}`
    );

    // GET request to fetch all the upComing movie details from TMDB Api with axios
    const upComingMovies = await axios.get(
      `${TMDB_FETCH_MOVIES_BASE_URI}${TMDB_UPCOMING_MOVIES_URI}${API_QUERY}`
    );

    // GET request to fetch all the popular movie details from TMDB Api with axios
    const popularMovies = await axios.get(
      `${TMDB_FETCH_MOVIES_BASE_URI}${TMDB_POPULAR_MOVIES_URI}${API_QUERY}`
    );

    // GET request to fetch all the trending movie details from TMDB Api with axios
    const trendingMovies = await axios.get(
      `${TMDB_TRENDING_MOVIES_URI}${TMDB_API_KEY}`
    );

    // verifying data existence and return the data
    if (
      nowplayingmovies.data &&
      upComingMovies.data &&
      popularMovies.data &&
      trendingMovies.data
    ) {
      // reducing the surplus data
      trendingMovies.data.results.length = 2;

      // function to fetching all the details of the specied movie with refering to movie id
      let fetchTrendingMoviesDetails = async source => {
        try {
          const response = source.map(data => {
            return axios.get(
              `${TMDB_FETCH_MOVIES_BASE_URI}${data.id}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}`
            );
          });

          // wait until all promises resolve and returns the surplus data
          const unfilteredResult = await Promise.all(response);

          // map around surplus data and return only adequate data
          const filteredResult = unfilteredResult.map(data => {
            return data.data;
          });

          return filteredResult;
        } catch (error) {
          console.log(error);
        }
      };

      // storing the resultant array of data in a constant
      const trendingMoviesDetails = await fetchTrendingMoviesDetails(
        trendingMovies.data.results
      );
      // storing the resultant array of data in a constant
      const nowPlayingMoviesDetails = await fetchTrendingMoviesDetails(
        nowplayingmovies.data.results
      );
      // storing the resultant array of data in a constant
      const upComingMoviesDetails = await fetchTrendingMoviesDetails(
        upComingMovies.data.results
      );
      // storing the resultant array of data in a constant
      const popularMoviesDetails = await fetchTrendingMoviesDetails(
        popularMovies.data.results
      );

      return res
        .header("Access-Control-Allow-Origin", "http://localhost:3000")
        .json({
          nowplayingmoviesData: nowPlayingMoviesDetails,
          upComingMoviesData: upComingMoviesDetails,
          popularMoviesData: popularMoviesDetails,
          trendingMoviesData: trendingMoviesDetails
        });
    }

    return res.status(501).json({ error: "Internal Server error" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = router;
