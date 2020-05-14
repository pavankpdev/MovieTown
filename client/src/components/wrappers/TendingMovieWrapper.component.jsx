import React from "react";
import { connect } from "react-redux";

import TrendingMovies from "../TrendingMovieCard.component";
import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";

const TrendingMovieCardWrapper = ({
  trendingMoviesData,
  imageURL,
  ...props
}) => {
  const clickFuntion = (e) => {
    props.getMovieInfo(e.target.id);
  };
  return trendingMoviesData.map((data) => {
    const { genres, production_companies } = data;
    const genre = genres.length === 0 ? "ACTION" : genres[0].name;
    const prod =
      production_companies.length === 0
        ? "team work"
        : production_companies[0].name;
    return (
      <TrendingMovies
        id={data.id}
        key={data.id}
        imageURL={`${imageURL}${data.poster_path}`}
        title={data.title}
        rating={data.vote_average}
        lan={data.original_language}
        genre={genre}
        certificate={data.adult ? "A" : "UA"}
        production={prod}
        clickFuntion={clickFuntion}
      />
    );
  });
};

const mapStateToProps = (state) => ({
  selectedMovie: state.localMovie,
});

export default connect(mapStateToProps, { getMovieInfo })(
  TrendingMovieCardWrapper
);
