const router = require("express").Router();
const axios = require("axios");

const Dijkstra = require("../../functions/Dijsktra");
const { HERE_API_KEY } = require("../../config/keys");

// @Route GET /movies/theaters
// @des EXTERNAL_API_CALL to get the user current location and generate a list of real time theater data based on user location
//      and finding the shortest path using Dijkstra's algorithm.
// @access PUBLIC
router.post("/", async (req, res) => {
  try {
    const THEATER_LIST = [];
    // get user current location from front-end
    const USER_CURRENT_LOCATION = encodeURI(req.body.current_location);

    // get the nearest theater list using Hereapi
    const { data } = await axios.get(
      `https://places.ls.hereapi.com/places/v1/discover/search?at=${USER_CURRENT_LOCATION}&q=cinema%20theaters&tf=plain&apiKey=${HERE_API_KEY}`
    );

    //now map over all the individual result and fetch more detailed result
    data.results.items.splice(0, 5).map(async (theater) => {
      // get request to get the full details
      const { data } = await axios.get(theater.href);
      THEATER_LIST.push(data);
    });
    setTimeout(() => {
      Dijkstra(USER_CURRENT_LOCATION, THEATER_LIST);
    }, 1000);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
