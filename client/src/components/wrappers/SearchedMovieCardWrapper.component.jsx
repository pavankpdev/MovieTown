import React from "react";
import { connect } from "react-redux";

import SearchedMovieCard from "../searchedMovies.component";
import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";

const SearchedMovieCardWrapper = ({ source, ...props }) => {
  const clickFuntion = (e) => {
    props.getMovieInfo(e.target.id);
  };

  return (
    <div className="lg:mt-8 lg:mx-12 lg:flex lg:flex-wrap lg:-mb-4">
      {source.map((movie) => {
        let { production_companies, genres } = movie;

        production_companies =
          production_companies.length !== 0
            ? production_companies[0].name
            : "Team Effort";

        genres = genres.length !== 0 ? genres[0].name : "drama";
        return (
          <div className="lg:w-1/3">
            <SearchedMovieCard
              id={movie.id}
              key={movie.id}
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : "https://i.ibb.co/6ntQSKt/poster.png"
              }
              title={movie.title}
              production={production_companies}
              lan={movie.original_language}
              genre={genres}
              certificate={movie.adult}
              ratingsAvg={movie.vote_average}
              ratingsTotal={movie.vote_count}
              clickFuntion={clickFuntion}
            />
          </div>
        );
      })}
    </div>
  );
};
const mapStateToProps = (state) => ({
  selectedMovie: state.localMovie,
});

export default connect(mapStateToProps, { getMovieInfo })(
  SearchedMovieCardWrapper
);
