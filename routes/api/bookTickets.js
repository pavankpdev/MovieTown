const passport = require("passport");
const axios = require("axios");
const _ = require("lodash");
const router = require("express").Router();

const { THEATER_API_BASE_URL } = require("../../config/keys");
const seatsModel = require("../../Model/Seats.Model");
const { validateMovieAndTheaterNames } = require("../../validation/validation");

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

// @Route   GET /movies/booktickets/select_seats/:movie_name/:theater_name/:time
// @des     gets the details of movie and theater stored in localStorage Api
// @access  PRIVATE
router.get(
  "/select_seats/:movie_name/:theater_name/:time",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // validate the input parameters
    const { error } = validateMovieAndTheaterNames(req.params);
    if (error) return res.status(401).json({ validation_error: error });
    try {
      // find theater in the database
      const isTheaterAvailable = await seatsModel.findOne({
        theater_name: { $eq: req.params.theater_name },
      });
      // if theater found, check for movie name in that theater object
      if (isTheaterAvailable) {
        const isMovieAvailable = await seatsModel
          .findOne({
            "movies.movie_name": req.params.movie_name,
          })
          .select("movies.movie_name movies.shows");
        // if movie is found, return the seat details
        if (isMovieAvailable)
          return res.json({
            movie: isMovieAvailable.movies.filter(
              (movie) => movie.movie_name === req.params.movie_name
            ),
          });
        // if movie not found, add the movie property to the theater document
        let update = [
          ...isTheaterAvailable.movies,
          {
            movie_name: req.params.movie_name,
            shows: [
              {
                time: req.params.time,
                seats: [],
              },
            ],
          },
        ];
        let newMovie = await seatsModel
          .findOneAndUpdate(
            { theater_name: isTheaterAvailable.theater_name },
            { movies: update },
            { new: true }
          )
          .select("movies.movie_name movies.shows");
        newMovie.save();
        return res.json({
          movie: newMovie.movies.filter(
            (movie) => movie.movie_name === req.params.movie_name
          ),
        });
      }

      // if theater not found, then create new theater document
      let newTheater = new seatsModel({
        theater_name: req.params.theater_name,
        movies: [
          {
            movie_name: req.params.movie_name,
            shows: [
              {
                time: req.params.time,
                seats: [],
              },
            ],
          },
        ],
      });
      newTheater.save();
      return res.json({
        movie: newTheater.movies.filter(
          (movie) => movie.movie_name === req.params.movie_name
        ),
      });
    } catch (error) {
      res.json({ request_error: error.message });
    }
  }
);

module.exports = router;
