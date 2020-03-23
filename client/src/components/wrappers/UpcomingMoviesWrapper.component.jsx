import React from "react";

import UpcomingMovies from "../UpcomingMovies.component";

const UpPlayingMoviesWrapper = ({ source, image }) => {
  return source.slice(0, 6).map(data => {
    let { production_companies, genres } = data;

    production_companies =
      production_companies.length !== 0
        ? production_companies[0].name
        : "Team Effort";

    genres = genres.length !== 0 ? genres[0].name : "drama";
    return (
      <UpcomingMovies
        image={`${image}${data.poster_path}`}
        title={data.title}
        production={production_companies}
        lan={data.original_language}
        genre={genres}
        certificate={data.adult}
        interestTotal="38"
      />
    );
  });
};

export default UpPlayingMoviesWrapper;
