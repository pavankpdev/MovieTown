import React from "react";
import { Link } from "react-router-dom";

const NowPlayingMovies = ({
  image,
  title,
  production,
  lan,
  genre,
  certificate,
  ratingsTotal,
  id,
  clickFuntion,
}) => {
  const stars = (
    <div>
      <i className="fas fa-star fa-xs"></i>
      <i className="fas fa-star fa-xs"></i>
      <i className="fas fa-star fa-xs"></i>
      <i className="fas fa-star fa-xs"></i>
      <i className="far fa-star fa-xs"></i>
    </div>
  );

  return (
    <div className="lg:pl-0 pb-10 mt-12">
      <div className="sm:mx-4 bg-white rounded-lg  shadow-lg overflow-hidden lg:w-72 lg:mx-0 lg:shadow-2xl">
        <img
          className="h-64 w-full object-fill object-contain"
          src={image}
          alt={`${title} poster`}
        />
        <div className="px-3 py-4 flex justify-between items-center lg:px-4">
          <div>
            <h3 className="text-xl font-semibold text-headingColor w-32 truncate overflow-hidden ">
              {title}
            </h3>
            <h5 className="text-sm text-textColor w-32 truncate ">
              {production ? production : "Team Effort"}
            </h5>
            <div className="mt-1 text-gray-600 text-xs uppercase font-semibold tracking-wide lg:text-sm">
              {lan} &bull; {genre ? genre : "drama"} &bull;{" "}
              {certificate ? "A" : "UA"}
            </div>
            <div className="flex items-baseline mt-2 text-logoColor items-center">
              {ratingsTotal > 0 ? stars : null}
              <span className="ml-2 text-xs font-bold uppercase text-logoColor">
                {ratingsTotal > 0
                  ? `${ratingsTotal} votes`
                  : " no votes yet"}
              </span>
            </div>
          </div>
          <Link to="/movies">
            <button
              onClick={clickFuntion}
              id={id}
              type="button"
              className="uppercase border-2 border-logoColor rounded px-2 py-2 text-tiny tracking-wider font-semibold text-logoColor sm:text-tiny md:text-xs lg:text-tiny lg:px-3 lg:py-2 hover:bg-logoColor hover:text-white"
            >
              Book now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingMovies;
