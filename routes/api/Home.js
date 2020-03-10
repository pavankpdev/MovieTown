const fetch = require("node-fetch");
const router = require("express").Router();

const {
  TMDB_FETCH_MOVIES_BASE_URI,
  TMDB_UPCOMING_MOVIES_URI,
  TMDB_NOW_PLAYING_URI,
  TMDB_API_KEY,
  TMDB_REGION,
  TMDB_LANGUAGE
} = require("../../config/keys");

const API_QUERY = `api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}&page=1&region=${TMDB_REGION}`;
let nowPlayingMoviesData = {};
let upcomingMoviesData = {};

// @Route   GET /
// @des     EXTERNAL_API_CALL gets movies information as a json format
// @access  PUBLIC
router.get("/", async (req, res) => {
  // function to load data to variable which was returned from promise
  const loadDAtaToVariable = (nowPlayingMovies, upComingMovies) => {
    nowPlayingMoviesData = { ...nowPlayingMovies };
    upcomingMoviesData = { ...upComingMovies };
  };

  // function to fetch all NOW_PLAYING movies from TMDB API
  const nowPlayingMovies = () => {
    fetch(`${TMDB_FETCH_MOVIES_BASE_URI}${TMDB_NOW_PLAYING_URI}${API_QUERY}`)
      .then(response => response.json())
      .then(json => {
        loadDAtaToVariable(json);
        res.json(json);
      })
      .catch(err => {
        if (err.name === "AbortError") {
          res.json({ error: err.name });
        }
      });
  };

  // function to fetch all UPCOMING movies from TMDB API
  const upComingMovies = () => {
    fetch(
      `${TMDB_FETCH_MOVIES_BASE_URI}${TMDB_UPCOMING_MOVIES_URI}${API_QUERY}`
    )
      .then(response => response.json())
      .then(json => res.json(json))
      .catch(err => {
        if (err.name === "AbortError") {
          res.json({ error: err.name });
        }
      });
  };
  nowPlayingMovies();
});

module.exports = router;
