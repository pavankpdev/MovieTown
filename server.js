const express = require("express");
const mongoose = require("mongoose");

const home = require("./routes/api/Home");
const user = require("./routes/api/Users");
const movies = require("./routes/api/Movies");
const { DB_CONNECTION_STRING } = require("./config/keys");

const app = express();

// middlewares
mongoose.set("useCreateIndex", true);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", home);
app.use("/users", user);
app.use("/movies", movies);

// DB connection
mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch(error => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
