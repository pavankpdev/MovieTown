const axios = require("axios");
const router = require("express").Router();

const {
  TMDB_FETCH_MOVIES_BASE_URI,
  TMDB_UPCOMING_MOVIES_URI,
  TMDB_NOW_PLAYING_URI,
  TMDB_POPULAR_MOVIES_URI,
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

    // verifying data existence and return the data
    if (nowplayingmovies.data && upComingMovies.data && popularMovies.data)
      return res
        .header("Access-Control-Allow-Origin", "http://localhost:3000")
        .json({
          nowplayingmoviesData: nowplayingmovies.data,
          upComingMoviesData: upComingMovies.data,
          popularMoviesData: popularMovies.data
        });

    return res.status(501).json({ error: "Internal Server error" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = router;
