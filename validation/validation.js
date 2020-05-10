const Joi = require("@hapi/joi");

// USER REGISTER validation using Joi
const validateUserRegister = (user) => {
  const schema = Joi.object({
    fullname: Joi.string().required().min(3),
    email: Joi.string().required().min(6).email(),
    phno: Joi.string().required().min(10),
    password: Joi.string().required().min(5),
  });

  return schema.validate(user);
};

// USER LOGIN validation using Joi
const validateUserLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(user);
};

// THEATER AND MOVIE NAME validation using Joi
const validateMovieAndTheaterNames = (details) => {
  const schema = Joi.object({
    seats: Joi.array(),
    movie_name: Joi.string().required().min(3),
    theater_name: Joi.string().required().min(3),
    time: Joi.string().required().min(4),
  });
  return schema.validate(details);
};

// USER TICKET HISTORY validation using Joi
const validateUserTicketHistory = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().min(6).email(),
    movie_name: Joi.string().required().min(3),
    theater_name: Joi.string().required().min(3),
    time: Joi.string().required().min(4),
    theater_address: Joi.string().required().min(8),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    type: Joi.string().required().min(3),
    date: Joi.string().required().min(3),
  });

  return schema.validate(data);
};

exports.validateUserRegister = validateUserRegister;
exports.validateUserLogin = validateUserLogin;
exports.validateMovieAndTheaterNames = validateMovieAndTheaterNames;
exports.validateUserTicketHistory = validateUserTicketHistory;
