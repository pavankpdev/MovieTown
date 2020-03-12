const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const home = require("./routes/api/Home");
const user = require("./routes/api/Users");
const movies = require("./routes/api/Movies");
const seats = require("./routes/api/Seats");
const { DB_CONNECTION_STRING } = require("./config/keys");

const app = express();

// DB connection
mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch(error => console.log(error));

// middlewares
mongoose.set("useCreateIndex", true);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", home);
app.use("/users", user);
app.use("/movies", movies);
app.use("/seats", seats);
app.use(passport.initialize());

// Configs
require("./config/passport")(passport);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
