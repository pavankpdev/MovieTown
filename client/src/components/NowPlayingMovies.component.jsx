import React from "react";

const NowPlayingMovies = ({
  image,
  title,
  production,
  lan,
  genre,
  certificate,
  ratingsAvg,
  ratingsTotal
}) => {
  return (
    <div className="mx-4 my-4 lg:w-1/4">
      <div className="mx-6 bg-white rounded-lg  shadow-lg overflow-hidden lg:w-full lg:mx-3">
        <img
          className="h-64 w-full object-fill object-contain"
          src={
            image
              ? image
              : "http://www.newdesignfile.com/postpic/2015/02/no-icon-available_68024.png"
          }
          alt={`${title} poster`}
        />
        <div className="px-3 py-4 flex justify-between items-center lg:px-4">
          <div>
            <h3 className="text-xl font-semibold text-headingColor w-48 truncate overflow-hidden ">
              {title}
            </h3>
            <h5 className="text-sm text-textColor w-32 truncate ">
              {production ? production : "Team Effort"}
            </h5>
            <div className="mt-1 text-gray-600 text-xs uppercase font-semibold tracking-wide lg:text-sm">
              {lan} &bull; {genre ? genre : "drama"} &bull;{" "}
              {certificate ? "A" : "UA"}
            </div>
            <div className="flex mt-2 text-logoColor">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
              <span className="ml-2 text-xs font-bold uppercase text-logoColor">
                {ratingsTotal} reviews
              </span>
            </div>
          </div>
          <button
            type="button"
            className="uppercase border-2 border-logoColor rounded px-2 py-2 text-xs tracking-wider font-semibold text-logoColor lg:px-3 lg:py-2 hover:bg-logoColor hover:text-white"
          >
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingMovies;
