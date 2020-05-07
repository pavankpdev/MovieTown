const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  theater_name: {
    type: String,
    required: true,
    minlength: 3,
  },
  movies: [
    {
      movie_name: {
        type: String,
        required: true,
      },
      shows: [
        {
          time: {
            type: String,
            required: true,
          },
          seats: {
            type: Array,
            required: true,
            default: [],
          },
        },
      ],
    },
  ],
});

const seatsModel = mongoose.model("seats", seatSchema);

module.exports = seatsModel;
