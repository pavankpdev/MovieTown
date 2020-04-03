import React from "react";

import ProductionCompanies from "./Production.component";
import CommentCompnent from "./Comments.component";
const MoviesInfoComponent = ({ comments, ...props }) => {
  console.log(props.props.backdrop_path);

  return (
    <div className="relative">
      <div>
        {/* Images */}
        <div className="absolute bg-black w-full opacity-50 backdropOverlay md:w-full"></div>
        <img
          className="w-full backdropImage"
          src={`http://image.tmdb.org/t/p/original${props.props.backdrop_path}`}
          alt="backdrop poster"
        />
      </div>
      <div className="absolute w-2/6 ml-4  border-4 border-white rounded-lg shadow poster md:w-1/5 lg:rounded-extendedcorner">
        <img
          className=" rounded-lg shadow-2xl lg:rounded-extendedcorner"
          src={`http://image.tmdb.org/t/p/original${props.props.poster_path}`}
          alt="poster"
        />
      </div>
      {/* overview details */}
      <div className="absolute mx-2 text-white overviewDetails">
        <div className="flex sm:justify-between items-center md:justify-start">
          <div className=" text-center block">
            <h4 className="text-sm font-semibold md:text-base lg:text-xl">
              {props.props.release_date}
            </h4>

            <h4 className="text-xs tracking-widest">Release Data</h4>
          </div>
          <div className="ml-3 text-center lg:ml-8">
            <h4 className="text-sm font-semibold md:text-base lg:text-xl">
              {props.props.vote_average}
            </h4>

            <div className="flex text-xs">
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

            <h4 className="text-xs tracking-widest">Minutes</h4>
          </div>
        </div>
      </div>
      {/* title */}
      <div className="absolute mt-3 title">
        <div>
          <h2 className="w-3/6 truncate text-headingColor text-xl font-bold uppercase lg:text-2xl lg:w-full">
            {props.props.title}: {props.props.tagline}
          </h2>
          <h3 className="uppercase text-sm text-gray-600 font-semibold lg:text-lg">
            {props.props.production_companies
              .slice(0, 1)
              .map(prod => `${prod.name}`)}
          </h3>
          <h3 className="uppercase text-sm text-gray-600 font-semibold lg:text-lg">
            {props.props.original_language} &#8226;{" "}
            {props.props.genres.slice(0, 1).map(genre => `${genre.name}`)}{" "}
            &#8226; UA
          </h3>
        </div>
      </div>
      {/* Buttons */}
      <div className="absolute flex justify-between items-center btns md:justify-end lg:justify-start">
        <div>
          <button
            type="button"
            className="uppercase text-sm bg-logoColor text-white font-semibold tracking-wider px-12 py-3 hover:bg-transparent hover:border-2 hover:border-logoColor hover:text-logoColor focus:bg-transparent focus:border-2 focus:border-logoColor focus:text-logoColor"
          >
            Book tickets
          </button>
        </div>
        <div>
          <button
            type="button"
            className="ml-3 uppercase text-sm border-2 border-logoColor text-logoColor font-semibold tracking-wider px-8 py-3 hover:bg-logoColor hover:text-white focus:bg-logoColor focus:text-white"
          >
            rate this movie
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
          {props.props.production_companies.slice(0, 2).map(prod => (
            <div className="w-1/3 sm:w-1/4" key={prod.name}>
              <ProductionCompanies
                imageUrl={`http://image.tmdb.org/t/p/original${prod.logo_path}`}
                productionName={prod.name}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Comments */}
      <div>
        <div className="mt-4 absolute bg-white w-full shadow-lg comments">
          <div className="ml-4 mt-4 md:mt-8">
            <h3 className="text-headingColor font-bold text-2xl tracking-wider">
              Comments
            </h3>
          </div>
          <div>
            <div className="m-4">
              <img
                className="rounded-full shadow-lg"
                src="https://randomuser.me/api/portraits/med/women/75.jpg"
                alt="avatar"
              />
            </div>
            <div className="mx-6">
              <textarea
                name="typeComment"
                id="typeComment"
                rows="5"
                placeholder="Type your comments here. . . ."
                className="border border-headingColor w-full rounded-lg text-sm"
              ></textarea>
              <button
                type="button"
                className="uppercase text-xs bg-logoColor text-white font-semibold tracking-wider px-3 py-2 rounded float-right shadow-lg hover:bg-transparent hover:border-2 hover:border-logoColor hover:text-logoColor focus:bg-transparent focus:border-2 focus:border-logoColor focus:text-logoColor"
              >
                comment
              </button>
            </div>
          </div>
          {comments.map(data => (
            <div>
              <CommentCompnent
                key={data.user}
                comment={data.comments}
                avatar={data.avatar}
                name={data.user}
              />
            </div>
          ))}

          <div className="text-center my-6">
            <button className="uppercase text-sm font-semibold tracking-wider text-logoColor">
              read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesInfoComponent;
