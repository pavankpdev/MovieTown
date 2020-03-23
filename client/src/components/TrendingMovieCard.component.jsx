import React from "react";


const TrendingMovies = ({
  imageURL,
  title,
  rating,
  lan,
  genre,
  certificate,
  production
}) => {
  return (
    <div className=" ">
      <img
        className="w-full h-64 object-fill object-contain rounded-lg shadow-md lg:w-9/12 lg:h-9/12 lg:mx-auto"
        src={imageURL}
        alt="Trending"
      />

      <div className="relative px-4 -mt-10">
        <div className="flex justify-between items-center bg-white p-4 shadow-lg rounded-lg lg:w-9/12 lg:mx-auto">
          <div>
            <div className="flex items-baseline">
              <h4 className="text-headingColor font-semibold text-lg w-32 truncate overflow-hidden lg:text-2xl lg:w-56">
                {title}
              </h4>
              <i className="fas fa-heart fa-md text-red-600 ml-2 lg:text-xl"></i>
              <span className="text-sm text-headingColor ml-1 lg:text-lg">
                {rating}
              </span>
            </div>
            <h4 className="font-semibold text-sm text-textColor lg:text-lg">
              {production}
            </h4>
            <div className="mt-1 text-gray-600 text-xs uppercase font-semibold tracking-wide lg:text-sm">
              {lan} &bull; {genre} &bull; {certificate}
            </div>
          </div>

          <div>
            <button
              type="button"
              className="uppercase bg-logoColor rounded px-2 py-2 text-xs tracking-wider font-semibold text-white lg:px-3 lg:py-2"
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMovies;
