const passport = require("passport");
const _ = require("lodash");
const router = require("express").Router();

// @Route   GET /seats/
// @des     gets the info of the movie, selected theater and seats availability user must be signed in
// @access  PRIVATE 
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(_.pick(req.user, ["_id","fullname","email","phno"]));
  }
);

module.exports = router;
