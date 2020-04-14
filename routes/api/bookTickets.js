const passport = require("passport");
const axios = require("axios");
const _ = require("lodash");
const router = require("express").Router();

const {
  THEATER_API_BASE_URL,
  LOCALSTORAGE_API_BASE_URL_FOR_MOVIE,
  LOCALSTORAGE_API_BASE_URL_FOR_THEATER,
} = require("../../config/keys");

// @Route   GET /movies/booktickets/<movie_id>
// @des     gets the details of all the theater from Theater APi
// @access  PUBLIC
router.get("/", async (req, res) => {

  // GET request to fetch all theater from Theater APi details with axios
  const theaters = await axios.get(`${THEATER_API_BASE_URL}`, {
    params: {},
    headers: {
      "secret-key":
        "$2b$10$Aq89FSFbnAvcgWoQtRllUuUp8uAEttKmO29tXKFWLBE5JjApL2ea2",
    },
  });

  // verifying data existence
  if (!theaters.data) return res.status(401).json({ error: "invalid movie" });

  return res.json({ theatersInfo: theaters.data });
});

// @Route   GET /movies/booktickets/select_seats/:movie_id/:theater_id
// @des     gets the details of movie and theater stored in localStorage Api
// @access  PRIVATE
router.get(
  "/select_seats/:movie_id/:theater_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { movie_id, theater_id } = req.params;

      // GET request to fetch movie details from localstorage Api with axios
      const movieInfo = await axios.get(
        `${LOCALSTORAGE_API_BASE_URL_FOR_MOVIE}`
      );

      // GET request to fetch theater details from localstorage Api with axios
      const theaterInfo = await axios.get(
        `${LOCALSTORAGE_API_BASE_URL_FOR_THEATER}`
      );

      // verifying data existence and returning the response to client in JSON
      if (movieInfo.data && theaterInfo.data)
        return res.json({
          movie: _.pick(movieInfo.data, [
            "original_title",
            "id",
            "overview",
            "popularity",
            "genres",
            "adult",
            "release_date",
          ]),
          theare: _.pick(theaterInfo.data, [
            "theater_name",
            "theater_id",
            "location",
            "movies",
            "facilities",
            "seats",
          ]),
        });

      return res.status(501).json({ error: "Internal server error!" });
    } catch (err) {
      return res.json({ error: err });
    }
  }
);

module.exports = router;
