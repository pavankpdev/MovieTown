const passport = require("passport");
const axios = require("axios");
const _ = require("lodash");
const router = require("express").Router();

const { THEATER_API_BASE_URL } = require("../../config/keys");
const seatsModel = require("../../Model/Seats.Model");
const { validateMovieAndTheaterNames } = require("../../validation/validation");
const { seats } = require("../../utils/Seats.template");

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
      // check for theatrer availability
      const theater = await seatsModel.findOne({
        theater_name: req.params.theater_name,
      });
      // if theater, not available create new theater
      if (!theater) {
        // creating a new theater document
        const newTheater = new seatsModel({
          theater_name: req.params.theater_name,
          movies: [
            {
              movie_name: req.params.movie_name,
              shows: [{ time: req.params.time, seats: seats }],
            },
          ],
        });
        // saving the document to database
        newTheater.save();
        // Sorting all the surplus data of new movie
        const sortNewTheaterData = newTheater.movies.filter((movie) => {
          return movie.movie_name === req.params.movie_name;
        });

        // return new theater
        return res.json({
          movie_name: sortNewTheaterData[0].movie_name,
          show: sortNewTheaterData[0].shows[0],
        });
      }
      // if theater available,
      // check for movie availability
      const checkmovies = theater.movies.filter(
        (movie) => movie.movie_name === req.params.movie_name
      );

      // if movie not available, create new one
      if (!checkmovies[0]) {
        // templating all the existing movies and new movie into an array
        const oldMovies =
          theater.movies.length !== 0
            ? [
                ...theater.movies,
                {
                  movie_name: req.params.movie_name,
                  shows: [{ time: req.params.time, seats: seats }],
                },
              ]
            : [
                {
                  movie_name: req.params.movie_name,
                  shows: [{ time: req.params.time, seats: seats }],
                },
              ];

        // updating the movie document in the database
        const newMovie = await seatsModel.findOneAndUpdate(
          {
            theater_name: req.params.theater_name,
          },
          { movies: oldMovies },
          { new: true }
        );

        // save to DB
        newMovie.save();

        // Sorting all the surplus data of new movie
        const sortNewMovieData = newMovie.movies.filter((movie) => {
          return movie.movie_name === req.params.movie_name;
        });

        // return to the client
        return res.json({
          movie_name: sortNewMovieData[0].movie_name,
          show: sortNewMovieData[0].shows[0],
        });
      }
      // if movie is avaialble then, check for the specified time
      // Sorting all the surplus data of exisiting movie
      const sortTheaterData = theater.movies.filter((movie) => {
        return movie.movie_name === req.params.movie_name;
      });

      // check for the specified time
      const time = sortTheaterData[0].shows.filter(
        (show) => show.time === req.params.time
      );

      // if the time is'nt available
      if (time.length === 0) {
        const oldshowInfo = [
          ...sortTheaterData[0].shows,
          {
            time: req.params.time,
            seats: seats,
          },
        ];
        // update the database
        const newTime = await seatsModel.findOneAndUpdate(
          {
            theater_name: req.params.theater_name,
            "movies.movie_name": req.params.movie_name,
          },
          { $set: { "movies.$.shows": oldshowInfo } },
          { new: true }
        );
        // save to database
        newTime.save();
        // filter the surplus data returned
        const sortMovieName = newTime.movies.filter(
          (movie) => movie.movie_name === req.params.movie_name
        );

        const sortNewTimeData = sortMovieName[0].shows.filter(
          (show) => show.time === req.params.time
        );

        return res.json({
          movie_name: sortTheaterData[0].movie_name,
          show: sortNewTimeData[0],
        });
      }

      // if the specified time exists then,
      // return to the client
      return res.json({
        movie_name: sortTheaterData[0].movie_name,
        show: time[0],
      });
    } catch (error) {
      res.json({ request_error: error.message });
    }
  }
);

module.exports = router;
