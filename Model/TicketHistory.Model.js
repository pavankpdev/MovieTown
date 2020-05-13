const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  history: [
    {
      poster: { type: String, required: true, minlength: 3 },
      theater_name: {
        type: String,
        required: true,
        minlength: 3,
      },
      theater_address: {
        type: String,
        required: true,
        minlength: 8,
      },
      movie_name: {
        type: String,
        required: true,
        minlength: 3,
      },
      time: {
        type: String,
        required: true,
        minlength: 2,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        minlength: 2,
      },
      date: {
        type: String,
        required: true,
        minlength: 2,
      },
    },
  ],
});

const ticketModel = mongoose.model("ticket_history", Schema);

exports.ticketModel = ticketModel;
