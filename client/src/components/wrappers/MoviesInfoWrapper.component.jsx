import React from "react";

import MoviesInfoComponent from "../MovieInfo.component";
import "../styles/MoviesInfoWrapper.styles.css";

const MoviesInfoWrapper = ({ list, ...props }) => {
  return (
    <div>
      {list.map((data) => (
        <MoviesInfoComponent
          key={`${data.title}`}
          props={data}
        />
      ))}
    </div>
  );
};

export default MoviesInfoWrapper;
