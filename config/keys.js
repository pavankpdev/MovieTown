module.exports = {
  DB_CONNECTION_STRING:
    "mongodb+srv://pavan:pavan123@devconnector-r5es8.mongodb.net/movietown?retryWrites=true&w=majority",
  BCRYPT_SALT: 10,
  JWT_PRIVATE_KEY: "MOVIE_TOWN_JWT_PRIVATE_KEY",
  TMDB_API_KEY: "a248d933920cd6d6527467220f28a930",
  TMDB_LANGUAGE: "en-US",
  TMDB_REGION: "US",
  TMDB_NOW_PLAYING_URI: "now_playing?",
  TMDB_UPCOMING_MOVIES_URI: "upcoming?",
  TMDB_FETCH_MOVIES_BASE_URI: "https://api.themoviedb.org/3/movie/",
  TMDB_BASE_URL: "http://image.tmdb.org/t/p/",
  TMDB_POSTER_WIDTH: "w200",
  THEATER_API_BASE_URL: "http://localhost:4000/api/theaterDB/"
};
