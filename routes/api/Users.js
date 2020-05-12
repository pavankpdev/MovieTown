const router = require("express").Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { userModel } = require("../../Model/User.Model");
const {
  validateUserRegister,
  validateUserLogin,
} = require("../../validation/validation");
const { BCRYPT_SALT, JWT_PRIVATE_KEY } = require("../../config/keys");

// @Route   POST /users/register
// @des     REGISTER user registration
// @access  PUBLIC
router.post("/register", async (req, res) => {
  //validating inputs before submiting to database
  const { error } = validateUserRegister(req.body);

  if (error)
    return res
      .status(400)
      .json({ error: "validating error " + error.details[0].message });

  try {
    // check whether the user exisits or not
    const user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: "User already exists." });

    // create new user
    let newUser = new userModel(
      _.pick(req.body, ["fullname", "email", "phno", "password"])
    );

    // hashing the password
    const salt = await bcrypt.genSalt(BCRYPT_SALT);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // save to database
    newUser = await newUser.save();
    // generate JSON-WEB-TOKEN for the user EXPIRES IN 3HRS
    const payload = _.pick(newUser, ["fullname", "email", "_id"]);
    jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: 10800 }, (err, token) => {
      if (err) return res.status(500).json({ error: err });
      // when succesful return user information with jwt token
      return res.json({ ...payload, token: "Bearer " + token });
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// @Route   POST /users/login
// @des     LOGIN user login
// @access  PUBLIC
router.post("/login", async (req, res) => {
  //validating inputs before submiting to database
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // check whether the user exisits or not
    const user = await userModel.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ error: "User with this email doesn't exists." });

    // compare the password with the encrypted password
    const verifyUser = await bcrypt.compare(req.body.password, user.password);
    if (!verifyUser) return res.status(400).json({ error: "invalid password" });

    // generate JSON-WEB-TOKEN for the user EXPIRES IN 3HRS
    const payload = _.pick(user, ["fullname", "email", "_id"]);
    jwt.sign(payload, JWT_PRIVATE_KEY, { expiresIn: 10800 }, (err, token) => {
      if (err) return res.status(500).json({ error: err });
      // when succesful return user information with jwt token
      res.json({ ...payload, token: "Bearer " + token });
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
