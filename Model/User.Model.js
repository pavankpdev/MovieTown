const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  phno: {
    type: String,
    unique: true,
    required: true,
    minlength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
});

const userModel = mongoose.model("users", userSchema);

exports.userModel = userModel;
