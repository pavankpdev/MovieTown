// @desc This file will simulate theater Database API and will be used to fetch theater information.

const express = require("express");
const jsonServer = require("json-server");

const api = express();

// This api will listen to port 4000
api.use("/api", jsonServer.router("theaterDB.json"));
api.listen(4000, () => console.log("Listening on port 4000"));
