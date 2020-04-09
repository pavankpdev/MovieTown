import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";
import PopularMovieCard from "../PopularMovie.component";
import ArrowButtons from "../Arrowbuttons.component";
import "../styles/PopularMoviesWrapper.styles.css";
const PropularMoviesWrapper = ({
  tranlateProperty,
  image,
  list,
  onClickArrowLeft,
  onClickArrowRight,
  ...props
}) => {
  let count = 0;

  const clickFuntion = e => {
    props.getMovieInfo(e.target.id);
  };
  return (
    <div>
      <div className="cards-slider sm:ml-2 md:ml-4 lg:ml-2 xl:ml-2">
        <div
          className="cards-slider-wrapper"
          style={{
            transform: `translateX(-${tranlateProperty}%)`
          }}
        >
          {list.map(data => (
            <Link to="/movies" key={count++}>
              <div id={data.id} onClick={clickFuntion}>
                <PopularMovieCard
                  id={data.id}
                  image={
                    data.poster_path
                      ? `${image}${data.poster_path}`
                      : "https://i.ibb.co/6ntQSKt/poster.png"
                  }
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ArrowButtons
        onClickArrowLeft={onClickArrowLeft}
        onClickArrowRight={onClickArrowRight}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  selectedMovie: state.localMovie
});

export default connect(mapStateToProps, { getMovieInfo })(
  PropularMoviesWrapper
);
