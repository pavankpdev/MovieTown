const router = require("express").Router();
const passport = require("passport");

const seatsModel = require("../../Model/Seats.Model");

// @Route   POST /movies/checkout
// @des     updates the seating information in the database
// @access  PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    try {
      // search for the theater
      const getSeats = await seatsModel
        .findOne({
          theater_name: req.body.theater_name,
        })
        .select("movies");

      // filter the object to get to the required document
      const sortedData = getSeats.movies
        .filter((movie) => movie.movie_name === req.body.movie_name)
        .map((show) => show.shows.filter((show) => show.time === req.body.time))
        .flat()
        .map((seats) => seats.seats)
        .flat();

      // update the seat object whose id is sent to server
      const updatedData = sortedData
        .map((array) => {
          let record = array
            .filter((seatRow) => req.body.seats.includes(seatRow.id) && seatRow)
            .map((arr) => {
              return { ...arr, disabled: "true" };
            });
          return record;
        })
        .flat();

      // filter and remove the data whose id was sent
      const restOfTheList = sortedData.map((array) => {
        let record = array.filter(
          (seatRow) => !req.body.seats.includes(seatRow.id) && seatRow
        );

        return record;
      });

      // push the updated data respective object
      updatedData.map((data) =>
        data.id.includes("L")
          ? restOfTheList[0].push(data)
          : restOfTheList[1].push(data)
      );

      // get the whole shows object
      const restofTheOriginalData = getSeats.movies.filter(
        (data) => data.movie_name === req.body.movie_name
      );
      // filter the object whose time != to request time
      const originaldata = restofTheOriginalData
        .map((data) => {
          let result = data.shows.filter((show) => show.time !== req.body.time);
          return result;
        })
        .flat();

      // template to update the database with updated data
      let template = [
        ...originaldata,
        {
          seats: [...restOfTheList],
          time: req.body.time,
        },
      ];

      // updating the DB
      const updateSeats = await seatsModel.findOneAndUpdate(
        {
          theater_name: req.body.theater_name,
          "movies.movie_name": req.body.movie_name,
        },
        {
          $set: { "movies.$.shows": template },
        },
        { new: true }
      );
      // saving to dataBase
      updateSeats.save();

      const filterMovies = updateSeats.movies.filter(
        (movie) => movie.movie_name === req.body.movie_name
      );
      const returnData = filterMovies[0].shows.filter(
        (show) => show.time === req.body.time && show
      );

      // return to client
      res.json(...returnData);
    } catch (error) {
      res.json({ request_error: error.message });
    }
  }
);

module.exports = router;
