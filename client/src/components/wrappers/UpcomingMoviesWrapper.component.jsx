import React from "react";

import UpcomingMovies from "../UpcomingMovies.component";

const UpPlayingMoviesWrapper = ({ source, image, ...props }) => {
  return source.slice(0, 6).map(data => {
    // checking for empty data and updating them with default data
    let { production_companies, genres } = data;
    production_companies =
      production_companies.length !== 0
        ? production_companies[0].name
        : "Team Effort";

    genres = genres.length !== 0 ? genres[0].name : "drama";
    return (
      <UpcomingMovies
        id={data.id}
        key={data.id}
        image={
          data.poster_path
            ? `${image}${data.poster_path}`
            : "https://i.ibb.co/6ntQSKt/poster.png"
        }
        title={data.title}
        production={production_companies}
        lan={data.original_language}
        genre={genres}
        certificate={data.adult}
        interestTotal={data.interested}
      />
    );
  });
};

export default UpPlayingMoviesWrapper;
