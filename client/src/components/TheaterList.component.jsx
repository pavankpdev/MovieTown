import React from "react";

const TheaterList = ({ name, location, time, facilities }) => {
  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <h6 className="text-xs w-48 truncate">{location}</h6>
          <div className="text-teal-400 text-xs flex items-center mt-2">
            {time.map((data) => (
              <button
                className="mr-1 px-2 py-1 border border-teal-400 rounded font-semibold md:px-3"
                key={data}
              >
                {data}
              </button>
            ))}
          </div>
        </div>
        <div className="ml-3 flex justify-center items-center flex-wrap -mb-4">
          {facilities.map((icon) => (
            <img className="mr-2" src={icon} alt="dolby" key={Math.random()} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TheaterList;
