const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
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
    type: Number,
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

const validateUser = user => {
  const schema = Joi.object({
    fullname: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .required()
      .min(6)
      .email(),
    phno: Joi.number()
      .required()
      .min(10),
    password: Joi.string()
      .required()
      .min(5)
  });

  return schema.validate(user);
};

exports.userModel = userModel;
exports.validateUserRegister = validateUser;
