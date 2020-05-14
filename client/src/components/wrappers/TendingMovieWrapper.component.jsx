import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TrendingMovies from "../TrendingMovieCard.component";
import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";

const TrendingMovieCardWrapper = ({
  trendingMoviesData,
  imageURL,
  ...props
}) => {
  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 680,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      {
        breakpoint: 430,
        settings: {
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };
  const clickFuntion = (e) => {
    props.getMovieInfo(e.target.id);
  };
  return (
    <Slider {...settings}>
      {trendingMoviesData.map((data) => (
        <TrendingMovies
          id={data.id}
          key={data.id}
          imageURL={`${imageURL}${data.poster_path}`}
          title={data.title}
          rating={data.vote_average}
          lan={data.original_language}
          genre={data.genres.length === 0 ? "Action" : data.genres[0].name}
          certificate={data.adult ? "A" : "UA"}
          production={
            data.production_companies.length === 0
              ? "Action"
              : data.production_companies[0].name
          }
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
  TrendingMovieCardWrapper
);
