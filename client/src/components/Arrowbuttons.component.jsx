import React from "react";
import "./styles/ArrowButtons.styles.css";

const ArrowButtons = ({ onClickArrowLeft, onClickArrowRight }) => {
  return (
    <div className="arrow-btns">
      <button
        className="arrow-left hover:text-blue-900  focus:outline-none"
        onClick={onClickArrowLeft}
      >
        <i className="far fa-arrow-alt-circle-left  fa-2x  "></i>
      </button>
      <button
        className="arrow-right  hover:text-blue-900 focus:outline-none"
        onClick={onClickArrowRight}
      >
        <i className="far fa-arrow-alt-circle-right   fa-2x "></i>
      </button>
    </div>
  );
};

export default ArrowButtons;
