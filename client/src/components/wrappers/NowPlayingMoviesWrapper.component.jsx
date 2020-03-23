import React from "react";

import NowPlayingMovies from "../NowPlayingMovies.component";

const NowPlayingMoviesWrapper = ({ source, image }) => {
  return source.slice(0, 6).map(data => {
    let { production_companies, genres } = data;

    production_companies =
      production_companies.length !== 0
        ? production_companies[0].name
        : "Team Effort";

    genres = genres.length !== 0 ? genres[0].name : "drama";
    return (
      <NowPlayingMovies
        key={data.id}
        image={`${image}${data.poster_path}`}
        title={data.title}
        production={production_companies}
        lan={data.original_language}
        genre={genres}
        certificate={data.adult}
        ratingsAvg={data.vote_average}
        ratingsTotal={data.vote_count}
      />
    );
  });
};

export default NowPlayingMoviesWrapper;
