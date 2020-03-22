import React from "react";

import TrendingMovies from "../TrendingMovieCard.component";

const TrendingMovieCardWrapper = ({ trendingMoviesData, imageURL }) => {
  return trendingMoviesData.map(data => {
    return (
      <TrendingMovies
        key={data.id}
        imageURL={`${imageURL}${data.poster_path}`}
        title={data.title}
        rating={data.vote_average}
        lan={data.original_language}
        genre={data.genres[0].name}
        certificate={data.adult ? "A" : "UA"}
        production={data.production_companies[0].name}
      />
    );
  });
};

export default TrendingMovieCardWrapper;
