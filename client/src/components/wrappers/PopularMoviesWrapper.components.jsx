import React from "react";

import PopularMovieCard from "../PopularMovie.component";
import ArrowButtons from "../Arrowbuttons.component";
import "../styles/PopularMoviesWrapper.styles.css";
const PropularMoviesWrapper = ({
  tranlateProperty,
  imageUrl,
  imageWidth,
  list,
  onClickArrowLeft,
  onClickArrowRight,
  clickFuntion
}) => {
  let count = 0;
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
            <PopularMovieCard
              key={count++}
              imageUrl={imageUrl}
              imageWidth={imageWidth}
              imagePath={data.poster_path}
              clickFuntion={clickFuntion}
            />
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

export default PropularMoviesWrapper;
