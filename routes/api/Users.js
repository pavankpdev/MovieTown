const router = require("express").Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const { userModel, validateUserRegister } = require("../../Model/User.Model");
const { BCRYPT_SALT } = require("../../config/keys");

// @Route   POST /users/register
// @des     REGISTER user registration
// @access  PUBLIC
router.post("/register", async (req, res) => {
  //validate before submiting to database
  const { error } = validateUserRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // check whether the user exisits or not
    const user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: "User already exists." });

    // create new user
    let newUser = new userModel(
      _.pick(req.body, ["fullname", "email", "phno", "password"])
    );

    // hashing the password
    newUser.password = await bcrypt.genSalt(BCRYPT_SALT, newUser.password);

    // save to database
    newUser = await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// @Route   POST /users/login
// @des     LOGIN user login
// @access  PUBLIC
router.post("/login", async (req, res) => {
  try {
    // check whether the user exisits or not
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Entered email does'nt exists." });

    // compare the password with the encrypted password
    const verifyUser = await bcrypt.compare(req.body.password, user.password);
    if (!verifyUser)
      res.status(400).json({ error: "invalid password" });

    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
