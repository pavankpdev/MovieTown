const axios = require("axios");
const router = require("express").Router();

const { THEATER_API_BASE_URL } = require("../../config/keys");
// @Route   GET /movies/
// @des     gets the info of all theaters
// @access  PUBLIC
router.get("/", async (req, res) => {
  try {
    const data = await axios.get(THEATER_API_BASE_URL);
    if (!data.data)
      return res.status(501).json({ error: "Internal server error" });
    return res.send(data.data);
  } catch (error) {
    res.json({ err: error.message });
  }
});

// @Route   GET /movies/<movie_name>
// @des     gets the info of a particular theaters
// @access  PUBLIC
router.get("/:theater_name", async (req, res) => {
  try {
    const data = await axios.get(
      `${THEATER_API_BASE_URL}?theater_name=${encodeURI(
        req.params.theater_name
      )}`
    );
    if (!data.data)
      return res.status(501).json({ error: "Internal server error" });
    return res.send(data.data);
  } catch (error) {
    res.json({ err: error.message });
  }
});

module.exports = router;
