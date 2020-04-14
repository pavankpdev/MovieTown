import React from "react";
import ReactPlayer from 'react-player';

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
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      {/* <div
        className={
          toggle
            ? "panel flex items-top sm:block md:hidden lg:hidden xl:hidden"
            : "hidden panel"
        }
      >
        <center>
          <ReactPlayer
            width="40"
            height="10"
            url={source.videos.results.length !== undefined ? `https://www.youtube.com/watch?v=${source.videos.results[0].key}` : "https://www.youtube.com/watch?v=kpkpkkpkpkpkk" }
            controls
          />
          <button type="button" onClick={() => setToggle(false)}>
            <i class="fas fa-times-circle fa-lg"></i>
          </button>
        </center>
      </div> */}
      <div className=" w-screen h-screen overflow-hidden">
        <div className="bg-black w-screen h-screen absolute opacity-25"></div>
        {/* poster */}
        <img
          className=""
          src={
            source.poster_path !== null
              ? `http://image.tmdb.org/t/p/original${source.poster_path}`
              : "https://i.ibb.co/6ntQSKt/poster.png"
          }
          alt=""
        />

        {/* selection section */}
        <div>
          {/* bg card */}
          <div className="bg-white w-screen h-screen absolute theater-card">
            <div className="flex justify-between items-center mx-4 lg:mx-10">
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
              {/* watch trailer button */}
              <div>
                <button className=" text-logoColor border-2 border-logoColor px-2 py-2 text-tiny rounded-md lg:text-sm" onClick = {() => setToggle(true)}>
                  watch trailer <i className="fas fa-play-circle"></i>
                </button>
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
