const router = require("express").Router();
const passport = require("passport");

const seatsModel = require("../../Model/Seats.Model");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // search for the theater
      const getSeats = await seatsModel.findOne({
        theater_name: req.body.theater_name,
      });

      // filter the object to get to the required document
      const sortedData = getSeats.movies
        .filter((movie) => movie.movie_name === req.body.movie_name)
        .map((show) => show.shows.filter((show) => show.time === req.body.time))
        .flat();

      sortedData[0].seats.push(...req.body.seats);

      // console.log(sortedData[0].__parentArray);

      const updateSeats = await seatsModel.findOneAndUpdate(
        {
          theater_name: req.body.theater_name,
          "movies.movie_name": req.body.movie_name,
        },
        {
          "movies.$.shows": sortedData[0].__parentArray,
        },
        { new: true }
      );
      updateSeats.save();
      res.send(updateSeats);
    } catch (error) {
      res.json({ request_error: error.message });
    }
  }
);

module.exports = router;
