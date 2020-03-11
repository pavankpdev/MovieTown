const express = require("express");
const jsonServer = require("json-server");

const api = express();

api.use("/api", jsonServer.router("db.json"));
api.listen(4000, () => console.log("Listening on port 4000"));
