import React from "react";
import { Link } from "react-router-dom";

const TrendingMovies = ({
  imageURL,
  title,
  rating,
  lan,
  genre,
  certificate,
  production,
  clickFuntion,
  id,
}) => {
  return (
    <div className="pl-2 pb-4 lg:pl-6 lg:pb-10">
      <img
        className="w-full h-74 object-fill object-contain rounded-lg shadow-md lg:h-80"
        src={imageURL}
        alt="Trending"
      />

      <div className="relative px-3 -mt-10 lg:-mr-3">
        <div className="flex justify-between items-center bg-white p-4 shadow-lg rounded-lg md:w-10/12 lg:w-11/12 lg:mx-auto lg:shadow-2xl">
          <div>
            <div className="flex items-baseline">
              <h4 className="text-headingColor font-semibold text-base w-32 truncate overflow-hidden lg:text-base lg:w-48">
                {title}
              </h4>
              <i className="fas fa-heart fa-md text-red-600 ml-2 lg:text-base"></i>
              <span className="text-sm text-headingColor ml-1 lg:text-base">
                {rating}
              </span>
            </div>
            <h4 className="font-semibold text-xs text-textColor w-24 truncate  lg:w-32 lg:text-sm">
              {production}
            </h4>
            <div className="mt-1 text-gray-600 text-xs uppercase font-semibold tracking-wide lg:text-sm">
              {lan} &bull; {genre} &bull; {certificate}
            </div>
          </div>

          <div>
            <Link to="/movies">
              <button
                id={id}
                onClick={clickFuntion}
                type="button"
                className="uppercase bg-logoColor rounded px-2 py-2 text-tiny tracking-wider font-semibold text-white lg:py-2 hover:bg-white hover:border-2 hover:border-logoColor hover:text-logoColor"
              >
                Book now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
