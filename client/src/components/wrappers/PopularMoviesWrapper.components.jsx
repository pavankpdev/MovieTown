import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMovieInfo } from "../../redux/reducers/movieInfoReducer/movieInfo.action";
const PropularMoviesWrapper = ({
  tranlateProperty,
  image,
  list,
  onClickArrowLeft,
  onClickArrowRight,
  ...props
}) => {
  const clickFuntion = (e) => {
    props.getMovieInfo(e.target.id);
  };
  let settings = {
    autoplay: true,
    centerMode: true,
    centerPadding: "300px",
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "300px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="mt-5">
        <Slider {...settings}>
          {list.map((data) => (
            <div className="pl-2" key={Math.random()}>
              <div className="relative ">
                <Link to="/movies">
                  {" "}
                  <div
                    id={data.id}
                    className=" absolute bg-black w-full h-56 opacity-25 rounded-lg cursor-pointer md:h-64 lg:h-74"
                    onClick={clickFuntion}
                  ></div>
                </Link>
                <img
                  className=" w-full h-56 md:h-64 lg:h-74 rounded-lg"
                  src={
                    data.poster_path
                      ? `${image}${data.poster_path}`
                      : "https://i.ibb.co/pvBcssg/backdrop.png"
                  }
                  alt=""
                />

                <div
                  className="bg-white uppercase font-bold text-xs text-logoColor tracking-widest px-2 py-1 rounded-full"
                  style={{ position: "absolute", top: "8px", left: "6px" }}
                >
                  <i className="fas fa-star fa-md"></i> Most popular
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* <ArrowButtons
        onClickArrowLeft={onClickArrowLeft}
        onClickArrowRight={onClickArrowRight}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedMovie: state.localMovie,
});

export default connect(mapStateToProps, { getMovieInfo })(
  PropularMoviesWrapper
);
