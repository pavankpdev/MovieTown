import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

import ProductionCompanies from "./Production.component";
import { useState } from "react";
const MoviesInfoComponent = ({ ...props }) => {
  const image = "http://image.tmdb.org/t/p/original";
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div
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
            url={`https://www.youtube.com/watch?v=${
              props.props.videos.results.length !== 0
                ? props.props.videos.results[0].key
                : "kpkpkkpkpkpkk"
            }`}
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
          url={`https://www.youtube.com/watch?v=${
            props.props.videos.results.length !== 0
              ? props.props.videos.results[0].key
              : "someInvalidKey"
          }`}
          controls
        />
        <button type="button" onClick={() => setToggle(false)}>
          <i class="fas fa-times-circle fa-2x"></i>
        </button>
      </div>
      <div className={toggle ? "relative backdropParent" : "relative"}>
        <div>
          {/* Images */}
          <div className="absolute bg-black w-full opacity-50 backdropOverlay md:w-full">
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
            className="w-full backdropImage"
            src={
              props.props.backdrop_path !== null
                ? `${image}${props.props.backdrop_path}`
                : "https://i.ibb.co/pvBcssg/backdrop.png"
            }
            alt="backdrop poster"
          />
        </div>
        <div className="absolute w-2/6 ml-2  border-4 border-white rounded-lg shadow poster md:w-1/5 md:ml-4 lg:ml-4 lg:rounded-extendedcorner">
          <img
            className=" rounded-lg shadow-2xl lg:rounded-extendedcorner"
            src={
              props.props.poster_path !== null
                ? `${image}${props.props.poster_path}`
                : "https://i.ibb.co/6ntQSKt/poster.png"
            }
            alt="poster"
          />
        </div>
        {/* overview details */}
        <div className="absolute mx-2 text-white overviewDetails">
          <div className="flex sm:justify-between items-baseline md:justify-start">
            <div className=" text-center block">
              <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                {props.props.release_date}
              </h4>

              <h4 className="text-tiny tracking-widest">Release Data</h4>
            </div>
            <div className="ml-3 text-center lg:ml-8">
              <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                {props.props.vote_average}
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
                {props.props.runtime !== 0 ? props.props.runtime : 120}
              </h4>

              <h4 className="text-tiny tracking-widest">Minutes</h4>
            </div>
          </div>
        </div>
        {/* title */}
        <div className="absolute mt-3 title">
          <div>
            <h2 className=" text-headingColor text-base font-bold uppercase lg:text-2xl">
              {props.props.title}
            </h2>
            <h3 className=" uppercase text-sm text-gray-600 font-semibold lg:text-lg">
              {props.props.production_companies
                .slice(0, 1)
                .map((prod) => `${prod.name}`)}
            </h3>
            <h3 className="uppercase text-sm text-gray-600 font-semibold lg:text-lg">
              {props.props.original_language} &#8226;{" "}
              {props.props.genres.slice(0, 1).map((genre) => `${genre.name}`)}{" "}
              &#8226; UA
            </h3>
          </div>
        </div>
        {/* Buttons */}
        <div className="absolute flex justify-around items-center btns md:justify-end lg:justify-start">
          <div>
            <Link to="/movies/theater">
              <button
                type="button"
                className="uppercase text-tiny border-2 border-logoColor bg-logoColor text-white font-semibold tracking-wider px-10 py-3 hover:bg-blue-900 focus:bg-blue-900 focus:outline-none"
              >
                Book tickets
              </button>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="md:ml-2 lg:ml-2 uppercase text-tiny border-2 border-logoColor text-logoColor font-semibold tracking-wider px-10 py-3 hover:bg-logoColor hover:text-white focus:bg-logoColor focus:text-white focus:outline-none"
            >
              review
            </button>
          </div>
        </div>
        {/* Description */}
        <div className="absolute description">
          <div>
            <h3 className="text-headingColor font-bold text-2xl tracking-wider">
              Description
            </h3>
          </div>
          <div className="mt-3 mr-3">
            <p className="text-sm text-headingColor font-medium tracking-wide pr-1">
              {props.props.overview}
            </p>
          </div>
        </div>
        {/* Production Companies */}
        <div className="absolute production">
          <div>
            <h3 className="text-headingColor font-bold text-2xl tracking-wider">
              Production Companies
            </h3>
          </div>
          <div className="mt-8 flex sm:justify-around items-baseline">
            {props.props.production_companies.slice(0, 2).map((prod) => (
              <div className="w-1/3 sm:w-1/4" key={prod.name}>
                <ProductionCompanies
                  imageUrl={`http://image.tmdb.org/t/p/original${prod.logo_path}`}
                  productionName={prod.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesInfoComponent;
