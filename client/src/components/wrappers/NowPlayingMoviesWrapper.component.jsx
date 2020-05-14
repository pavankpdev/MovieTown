import React from "react";
import { connect } from "react-redux";

import NowPlayingMovies from "../NowPlayingMovies.component";
import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NowPlayingMoviesWrapper = ({ source, image, ...props }) => {
  const clickFuntion = (e) => {
    props.getMovieInfo(e.target.id);
  };
  const settings = {
    centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
  };
  return (
    <Slider {...settings}>
      {source.slice(0, 6).map((data) => (
        <NowPlayingMovies
          id={data.id}
          key={data.id}
          image={
            data.poster_path
              ? `${image}${data.poster_path}`
              : "https://i.ibb.co/6ntQSKt/poster.png"
          }
          title={data.title}
          production={
            data.production_companies.length !== 0
              ? data.production_companies[0].name
              : "Team Effort"
          }
          lan={data.original_language}
          genre={data.genres.length !== 0 ? data.genres[0].name : "drama"}
          certificate={data.adult}
          ratingsAvg={data.vote_average}
          ratingsTotal={data.vote_count}
          clickFuntion={clickFuntion}
        />
      ))}
    </Slider>
  );
};

const mapStateToProps = (state) => ({
  selectedMovie: state.localMovie,
});

export default connect(mapStateToProps, { getMovieInfo })(
  NowPlayingMoviesWrapper
);
