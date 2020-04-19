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
    <div className=" sm:mt-4 md:w-1/2 md:mt-3 lg:w-1/3 lg:ml-0 lg:mt-0 xl:mt-0">
      <img
        className="w-full h-64 object-fill object-contain rounded-lg shadow-md md:w-10/12 lg:w-9/12 lg:h-9/12 lg:mx-auto"
        src={imageURL}
        alt="Trending"
      />

      <div className="relative px-2 -mt-10">
        <div className="flex justify-between items-center bg-white p-4 shadow-lg rounded-lg md:w-10/12 lg:w-9/12 lg:mx-auto">
          <div>
            <div className="flex items-baseline">
              <h4 className="text-headingColor font-semibold text-base w-20 truncate overflow-hidden lg:text-base lg:w-32">
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
