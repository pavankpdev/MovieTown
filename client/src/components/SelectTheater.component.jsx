import React from "react";
import ReactPlayer from "react-player";

import TheaterList from "./TheaterList.component";
import "./styles/SelectTheater.styles.css";
import { useState } from "react";
const SelectTheater = ({
  source,
  production,
  genre,
  month,
  currentDate,
  theaterlist,
}) => {
  console.log(source);

  const [toggle, setToggle] = useState(false);
  const [sourceState, setSource] = useState("invalid_key");
  const image = "https://image.tmdb.org/t/p/original";
  setTimeout(() => {
    setSource(
      source.videos !== undefined ? source.videos.results[0].key : sourceState
    );
  }, 3000);
  return (
    <div>
      <div
        className={
          toggle
            ? "panel flex items-top  sm:block md:hidden lg:hidden xl:hidden"
            : "hidden panel"
        }
      >
        <center>
          <ReactPlayer
            width="40"
            height="10"
            url={`https://www.youtube.com/watch?v=${sourceState}`}
            controls
          />
          <button type="button" onClick={() => setToggle(false)}>
            <i className="fas fa-times-circle fa-lg"></i>
          </button>
        </center>
      </div>
      <div
        className={
          toggle
            ? "panel flex justify-between sm:hidden md:block lg:block xl:block"
            : "hidden panel"
        }
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${sourceState}`}
          controls
        />
        <button type="button" onClick={() => setToggle(false)}>
          <i className="fas fa-times-circle fa-2x"></i>
        </button>
      </div>
      <div
        className={
          toggle
            ? " select-teater_backdropParent w-screen h-screen overflow-hidden"
            : "w-screen h-screen overflow-hidden"
        }
      >
        <div>
          {/* Images */}
          <div className="absolute bg-black w-full opacity-50 select-teater_backdropOverlay md:w-full">
            <center>
              <button
                className="hover:text-white focus:outline-none"
                onClick={() => setToggle(true)}
              >
                <i className="fas fa-play-circle text-white fa-3x mt-16 md:mt-24 lg:mt-48"></i>
              </button>
            </center>
          </div>
          <img
            className="w-full select-teater_backdropImage"
            src={
              source.backdrop_path !== null
                ? `${image}${source.backdrop_path}`
                : "https://i.ibb.co/pvBcssg/backdrop.png"
            }
            alt="backdrop select-teater_poster"
          />
        </div>
        <div className="absolute w-2/6 ml-2  border-4 border-white rounded-lg shadow select-teater_poster md:w-1/5 md:ml-4 lg:w-1/6 lg:ml-4 lg:rounded-extendedcorner">
          <img
            className=" rounded-lg shadow-2xl lg:rounded-extendedcorner"
            src={
              source.poster_path !== null
                ? `${image}${source.poster_path}`
                : "https://i.ibb.co/6ntQSKt/select-teater_poster.png"
            }
            alt="select-teater_poster"
          />
        </div>
        {/* overview details */}
        <div className="absolute mx-2 text-white select-teater_overviewDetails">
          <div className="flex sm:justify-between items-baseline md:justify-start">
            <div className=" text-center block">
              <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                {source.release_date}
              </h4>

              <h4 className="text-tiny tracking-widest">Release Data</h4>
            </div>
            <div className="ml-3 text-center lg:ml-8">
              <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                {source.vote_average}
              </h4>

              <div className="flex text-tiny">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className="ml-3 text-center lg:ml-8">
              <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                {source.runtime !== 0 ? source.runtime : 120}
              </h4>

              <h4 className="text-tiny tracking-widest">Minutes</h4>
            </div>
          </div>
        </div>

        {/* selection section */}
        <div>
          {/* bg card */}
          <div className="bg-white w-screen h-screen absolute theater-card">
            <div className="flex justify-between items-center mx-4 lg:mx-10 lg:mt-6">
              {/* title and info */}
              <div className="text-headingColor mt-4 ">
                <h2 className=" text-lg font-bold uppercase tracking-wider lg:text-2xl pt-3">
                  {source.title}
                </h2>
                <h3 className="uppercase text-xs text-gray-600 font-semibold pt-2 lg:text-sm lg:w-full">
                  {production}
                </h3>
                <h3 className="w-40 uppercase text-xs text-gray-600 font-semibold -pt-1  lg:text-sm">
                  {source.original_language} &#8226; {genre} &#8226; UA
                </h3>
              </div>
            </div>
            {/* date */}
            <div className="flex justify-between items-center mt-8 mx-4 w-screen overflow-x-auto md:justify-center">
              <div className="mr-4 text-center font-semibold px-2 border-2 border-blue-400 bg-blue-100 rounded-md md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 1}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 2}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 3}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 4}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 5}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 6}</h5>
              </div>
              <div className="mr-4 text-center font-semibold px-2 md:mr-6">
                <h3 className="uppercase">{month}</h3>
                <h5>{currentDate + 7}</h5>
              </div>
            </div>
            <div className="mx-4 my-4">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-400">
                Select a theater from the list
              </h3>
            </div>
            {/* Theaters */}
            <div className="h-3/6 overflow-x-hidden overflow-y-auto">
              {theaterlist.theaterDB !== undefined
                ? theaterlist.theaterDB.map((theater) => (
                    <TheaterList
                      key={theaterlist.theater_id}
                      name={theater.theater_name}
                      location={theater.location}
                      time={theater.movies[0].time}
                      facilities={theater.facilities}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTheater;
