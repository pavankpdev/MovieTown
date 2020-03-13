const axios = require("axios");
const router = require("express").Router();

const {
  THEATER_API_BASE_URL,
  TMDB_FETCH_MOVIES_BASE_URI,
  TMDB_API_KEY,
  TMDB_LANGUAGE,
  LOCALSTORAGE_API_BASE_URL_FOR_MOVIE,
  LOCALSTORAGE_API_BASE_URL_FOR_THEATER
} = require("../../config/keys");

// @Route   GET /movies/<movie_id>
// @des     gets the details of the selected movie and saves it to localstorage
// @access  PUBLIC
router.get("/:movie_id", async (req, res) => {
  const movieId = encodeURI(req.params.movie_id);

  try {
    // GET request to fetch selected movie from TMDB Api details with axios
    const movie = await axios.get(
      `${TMDB_FETCH_MOVIES_BASE_URI}${movieId}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}`
    );

    // verifying data existence
    if (!movie.data) return res.status(401).json({ error: "invalid movie" });

    //  POST request to store selected movie details to localStrogae API
    const localStorageData = await axios.post(
      `${LOCALSTORAGE_API_BASE_URL_FOR_MOVIE}`,
      {
        ...movie.data
      }
    );

    // verifying data has been successfully stored in localStorage
    if (!localStorageData.data)
      return res.status(501).json({ error: "Internal server error" });

    return res.json(localStorageData.data);
  } catch (error) {
    res.json({ err: "catch" + error.message });
  }
});

// @Route   GET /movies/booktickets/<movie_id>
// @des     gets the details of all the theater from Theater APi and also selected movie detail from localstorage
// @access  PUBLIC
router.get("/booktickets/:movie_id", async (req, res) => {
  const movieId = encodeURI(req.params.movie_id);

  // GET request to fetch selected movie details from localstorage Api with axios
  const movie = await axios.get(`${LOCALSTORAGE_API_BASE_URL_FOR_MOVIE}`);
  // verifying data existence
  if (!movie.data) return res.status(401).json({ error: "invalid movie" });

  // GET request to fetch all theater from Theater APi details with axios
  const theaters = await axios.get(`${THEATER_API_BASE_URL}`);

  // verifying data existence
  if (!theaters.data) return res.status(401).json({ error: "invalid movie" });

  return res.json({ movieInfo: movie.data, theatersInfo: theaters.data });
});

module.exports = router;
