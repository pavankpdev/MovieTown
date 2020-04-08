const router = require("express").Router();
const axios = require("axios");

const {
  TMDB_FETCH_MOVIES_BASE_URI,
  TMDB_SEARCH_MOVIES_BASE_URI,
  TMDB_API_KEY,
  TMDB_LANGUAGE,
  TMDB_REGION,
} = require("../../config/keys");

// @Route GET /movies/search
// @des EXTERNAL_API_CALL to search the movies according to the input string and get details of that movie
// @access PUBLIC

router.post("/", async (req, res) => {
  const queryString = encodeURI(req.body.search_string);
  try {
    // search the query string for any movie match
    const { data } = await axios.get(
      `${TMDB_SEARCH_MOVIES_BASE_URI}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}&query=${queryString}&page=1&include_adult=false&region=${TMDB_REGION}`
    );

    // if no movies found return with error message

    if (!data)
      return res.status(500).json({ error: "No movies found, Sorry!:(" });

    // if movies found map the list to get mor details on the movies

    // function to fetching all the details of the specied movie with refering to movie id
    let fetchMoviesDetails = async (source) => {
      try {
        const response = source.map((data) => {
          return axios.get(
            `${TMDB_FETCH_MOVIES_BASE_URI}${data.id}?api_key=${TMDB_API_KEY}&language=${TMDB_LANGUAGE}&append_to_response=videos`
          );
        });

        // wait until all promises resolve and returns the surplus data
        const unfilteredResult = await Promise.all(response);

        // map around surplus data and return only adequate data
        const filteredResult = unfilteredResult.map((data) => {
          return data.data;
        });

        return filteredResult;
      } catch (error) {
        return res.status(400).json({ error: error });
      }
    };

    const searchMovieData = await fetchMoviesDetails(data.results);

    // return the detailed movie list
    return res.status(200).send({
      searchMovieData,
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = router;
