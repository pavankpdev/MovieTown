import React from "react";
import "./styles/Footer.styles.css";

const Footer = () => {
  return (
    <div className="bg-white w-full shadow-inner footer py-6 align-baseline">
      <div className=" sm:px-20 md:px-64 lg:flex lg:justify-between">
        <button className=" cursor-pointer text-lg font-semibold text-headingColor md:text-xl lg:text-2xl hover:text-logoColor focus:text-logoColor">
          <a
            target="_blank"
            href="https://github.com/pavankpdev/MovieTown"
            rel="noopener noreferrer"
          >
            Fork this project on <i className="fab fa-github fa-lg"></i>
          </a>
        </button>
        <div>
          <a
            target="_blank"
            href="https://www.themoviedb.org/"
            rel="noopener noreferrer"
          >
            <img
              className=" w-5/12 mt-4 sm:mx-auto md:mx-auto md:w-3/12 lg:w-4/12"
              src="https://www.themoviedb.org/assets/2/v4/logos/293x302-powered-by-square-blue-ee05c47ab249273a6f9f1dcafec63daba386ca30544567629deb1809395d8516.png"
              alt="TMDB"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
