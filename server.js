const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const home = require("./routes/api/Home");
const user = require("./routes/api/Users");
const movies = require("./routes/api/Movies");
const seats = require("./routes/api/bookTickets");
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
app.use(cors());
app.use("/", home);
app.use("/users", user);
app.use("/movies", movies);
app.use("/movies/booktickets", seats);
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//The 404 Route
app.get("*", function(req, res) {
  res.status(404).send("404 Error! Invalid Route");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
