import React from "react";

const PopularMovieCard = ({ imageUrl, imageWidth, imagePath }) => {
  return (
    <div className="card mt-6 ">
      <div className="ml-3 relative shadow-2xl lg:mx-20">
        <img
          className="h-48 mx-auto rounded-lg w-full md:h-64 lg:h-pc lg:rounded-extendedcorner xl:h-pc xl:rounded-extendedcorner"
          src={`${imageUrl}${imageWidth}${imagePath}`}
          // src="https://cdn.pixabay.com/photo/2020/03/18/20/01/frankfurt-4945405_960_720.jpg"
          // src="https://cdn.pixabay.com/photo/2020/03/12/17/29/tiger-4925778_960_720.jpg"
          alt="popular movie"
        />
        <div
          className="bg-white uppercase font-bold text-xs text-logoColor tracking-widest px-2 py-1 rounded-full"
          style={{ position: "absolute", top: "8px", left: "6px" }}
        >
          <i className="fas fa-star fa-md"></i> Most popular
        </div>
      </div>
    </div>
  );
};

export default PopularMovieCard;
