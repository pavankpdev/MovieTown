const axios = require("axios");
const express = require("express");

const router = express.Router();

// @Route   GET /movies/<movie_name>
// @des     gets the info of the movie and theaters
// @access  PUBLIC
router.get("/", async (req, res) => {
  try {
    const data = await axios.get("http://localhost:4000/api/theaterDB");
    console.log(data.data);
    
    if (!data.data) return res.status(501).json({ error: "Internal server error" });
    return res.send(data.data);
  } catch (error) {
    res.json({ err: error.message });
  }
});

module.exports = router;
