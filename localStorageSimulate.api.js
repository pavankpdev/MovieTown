/* @desc This file will simulate localstorage task and will be used for backend development and testing,
 untill the frontend is implemented, later this will be removed and original localStorage will be utilized 
in the client side.*/

const express = require("express");
const jsonServer = require("json-server");

const api = express();

// This api will listen to port 5000
api.use("/api/localStorage", jsonServer.router("localStorage.json"));
api.listen(5000, () => console.log("Listening on port 5000"));
