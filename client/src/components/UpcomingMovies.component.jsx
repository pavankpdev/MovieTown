import React from "react";
import { useState } from "react";

const UpcomingMovie = ({
  image,
  title,
  production,
  lan,
  genre,
  certificate,
  interestTotal,
  id,
}) => {
  const [click, setClick] = useState(false);

  return (
    <div className="lg:pl-0 pb-10 mt-12">
      <div className="sm:mx-4 bg-white rounded-lg  shadow-lg overflow-hidden lg:w-72 lg:mx-0 lg:shadow-2xl">
        <img
          className="h-64 w-full object-fill object-contain"
          src={image}
          alt={`${title} poster`}
        />
        <div className="px-3 py-4 flex justify-between items-center lg:px-0">
          <div>
            <div className="flex items-baseline">
              <h4 className="text-headingColor font-semibold text-lg w-24 truncate overflow-hidden lg:text-2xl lg:w-32">
                {title}
              </h4>
              <i className="fas fa-thumbs-up fa-md text-logoColor ml-2 lg:text-md"></i>
              <span className="text-sm text-headingColor ml-1 lg:text-md">
                {interestTotal}
              </span>
            </div>
            <h5 className="text-sm text-textColor w-32 truncate ">
              {production ? production : "Team Effort"}
            </h5>
            <div className="mt-1 text-gray-600 text-xs uppercase font-semibold tracking-wide lg:text-sm">
              {lan} &bull; {genre ? genre : "drama"} &bull;{" "}
              {certificate ? "A" : "UA"}
            </div>
          </div>
          <button
            id={id}
            onClick={() => setClick(click ? false : true)}
            type="button"
            className="uppercase border-2 border-logoColor rounded px-2 py-2 text-xs tracking-wider font-semibold text-logoColor text-tiny lg:px-3 lg:py-2 hover:bg-logoColor hover:text-white focus:bg-logoColor focus:text-white"
          >
            {click ? "Not Interested" : "Interested"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovie;
