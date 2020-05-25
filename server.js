const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const home = require("./routes/api/Home");
const user = require("./routes/api/Users");
const seats = require("./routes/api/bookTickets");
const search = require("./routes/api/SearchMovie");
const theaters = require("./routes/api/Selecttheaters");
const checkout = require("./routes/api/Checkout");
const TicketHistory = require("./routes/api/TicketHistory");
const Dijkstra = require("./routes/api/Dijkstra");
const { DB_CONNECTION_STRING } = require("./config/keys");

const app = express();

// DB connection
mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch((error) => console.log(error));

// middlewares
mongoose.set("useCreateIndex", true);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/home", home);
app.use("/users", user);
app.use("/movies/theaters", theaters);
app.use("/movies/booktickets", seats);
app.use("/movies/search", search);
app.use("/movies/checkout", checkout);
app.use("/users/mytickets", TicketHistory);
app.use("/path", Dijkstra);
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// serve static asset in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/movies", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/movies/search", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/auth/signin", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/auth/signup", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/movies/theater", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/movies/seats", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("/mytickets", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("*", (req, res) => {
  res.send("404 error invalid route");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
