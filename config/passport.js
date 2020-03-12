const JWTStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const { JWT_PRIVATE_KEY } = require("./keys");
const { userModel } = require("../Model/User.Model");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_PRIVATE_KEY;

module.exports = passport => {
  passport.use(
    new JWTStratergy(opts, async (jwt_payload, done) => {
      try {
        const user = await userModel.findById(jwt_payload._id);
        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    })
  );
};
