import React from "react";

import MoviesInfoComponent from "../MovieInfo.component";
import "../styles/MoviesInfoWrapper.styles.css";

const MoviesInfoWrapper = ({ list, comments, ...props }) => {
  return (
    <div>
      {list.map(data => (
        <MoviesInfoComponent props={data} comments={comments} />
      ))}
    </div>
  );
};

export default MoviesInfoWrapper;
