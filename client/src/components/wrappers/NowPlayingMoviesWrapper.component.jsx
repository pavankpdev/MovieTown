import React from "react";
import { connect } from "react-redux";

import NowPlayingMovies from "../NowPlayingMovies.component";
import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";

const NowPlayingMoviesWrapper = ({ source, image, ...props }) => {
  const clickFuntion = (e) => {
    props.getMovieInfo(e.target.id);
  };
  return source.slice(0, 6).map((data) => {
    let { production_companies, genres } = data;

    production_companies =
      production_companies.length !== 0
        ? production_companies[0].name
        : "Team Effort";

    genres = genres.length !== 0 ? genres[0].name : "drama";
    return (
      <NowPlayingMovies
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
        ratingsAvg={data.vote_average}
        ratingsTotal={data.vote_count}
        clickFuntion={clickFuntion}
      />
    );
  });
};

const mapStateToProps = (state) => ({
  selectedMovie: state.localMovie,
});

export default connect(mapStateToProps, { getMovieInfo })(
  NowPlayingMoviesWrapper
);
