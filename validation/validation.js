const Joi = require("@hapi/joi");

// USER REGISTER validation using Joi
const validateUserRegister = user => {
  const schema = Joi.object({
    fullname: Joi.string()
      .required()
      .min(3),
    email: Joi.string()
      .required()
      .min(6)
      .email(),
    phno: Joi.string()
      .required()
      .min(10),
    password: Joi.string()
      .required()
      .min(5)
  });

  return schema.validate(user);
};

// USER LOGIN validation using Joi
const validateUserLogin = user => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .min(6)
      .email(),
    password: Joi.string()
      .required()
      .min(5)
  });
  return schema.validate(user);
};

exports.validateUserRegister = validateUserRegister;
exports.validateUserLogin = validateUserLogin;
