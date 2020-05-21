const router = require("express").Router();
const axios = require("axios");

const {
  THEATER_API_BASE_URL,
  GOOGLE_PLACES_URL,
  GOOGLE_PLACES_API,
  MAP_QUEST_API_KEY,
  MAP_QUEST_URL,
  MAP_QUEST_GEOCODE_URL,
} = require("../../config/keys");

// @Route GET /movies/theaters
// @des EXTERNAL_API_CALL to get the user current location and generate a list of real time theater data based on user location
//      and finding the shortest path using Dijkstra's algorithm.
// @access PUBLIC
router.get("/:zip", async (req, res) => {
  try {
    // User's Current zipcode
    const userzip = encodeURI(req.params.zip);
    console.log(userzip);
    //Geocode the zipcode with mapquest geocode api to get the users lat/lng
    const geoCode = await axios.get(
      `${MAP_QUEST_GEOCODE_URL}key=${MAP_QUEST_API_KEY}&location=${userzip}`
    );
    console.log(geoCode);
    //store the lat/lng of the user from mapquest api
    const userLocation = `${geoCode.data.results[0].locations[0].latLng.lat},${geoCode.data.results[0].locations[0].latLng.lng}`;
    console.log(userLocation);
    // Object Template to manipulate later
    let template = await axios.get(`${THEATER_API_BASE_URL}`, {
      headers: {
        "secret-key":
          "$2b$10$Aq89FSFbnAvcgWoQtRllUuUp8uAEttKmO29tXKFWLBE5JjApL2ea2",
      },
    });

    // reduce the array to only 8 elements
    template.data.theaterDB.length = 8;

    // GET request to Google places Api
    const places = await axios.get(
      `${GOOGLE_PLACES_URL}radius=10000&keyword=movie&type=cinema%20theater&location=${userLocation}&key=${GOOGLE_PLACES_API}`
    );
    // reduce the array to only 8 elements
    places.data.results.length = 8;
    console.log(places);
    // looping thorugh and modifing the template
    for (let i = 0; i < 6; i++) {
      template.data.theaterDB[i]["theater_name"] = places.data.results[i].name;
      template.data.theaterDB[i]["location"] = places.data.results[i].vicinity;
      template.data.theaterDB[i]["ratings"] = places.data.results[i].rating;
      template.data.theaterDB[i]["total_votes"] =
        places.data.results[i].user_ratings_total;
      template.data.theaterDB[i][
        "geometry"
      ] = `${places.data.results[i].geometry.location.lat},${places.data.results[i].geometry.location.lng}`;
      template.data.theaterDB[i]["distance"] = 0;
      template.data.theaterDB[i]["travel_time"] = "";
    }

    // map through the updated theater array and add distance and travel time between user and every individual theaters
    const fetchDistances = template.data.theaterDB.map(async (data) => {
      const result = await axios.get(
        `${MAP_QUEST_URL}key=${MAP_QUEST_API_KEY}&from=${userLocation}&to=${data.geometry}&unit=k`
      );
      data["distance"] = Math.ceil(result.data.route.distance);
      data["travel_time"] = Math.floor(result.data.route.time / 60);
      return data;
    });
    // awaing the promises
    const upDatedTheaterObject = await Promise.all(fetchDistances);
    console.log(upDatedTheaterObject);
    // return to client
    res.json(upDatedTheaterObject);
  } catch (error) {
    res.json({ request_error: `select theater BE ${error.message}` });
  }
});

module.exports = router;
