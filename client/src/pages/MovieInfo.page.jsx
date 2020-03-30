import React, { Component } from "react";
import axios from "axios";

class MovieInfo extends Component {
  constructor() {
    super();
    this.state = {
      comments: ""
    };
  }

  async componentDidMount() {
    const { data } = await axios("https://api.kanye.rest/");
    this.setState({ comments: data.quote });
  }

  render() {
    return (
      <div className="relative">
        <div>
          {/* Images */}
          <div
            className="absolute bg-black w-full opacity-50"
            style={{ height: "200px" }}
          ></div>
          <img
            className="w-full"
            style={{ height: "200px" }}
            src="http://image.tmdb.org/t/p/original/lP5eKh8WOcPysfELrUpGhHJGZEH.jpg"
            alt="backdrop poster"
          />
        </div>
        <div
          className="absolute w-2/6 ml-4  border-4 border-white rounded-lg shadow"
          style={{ top: "95px" }}
        >
          <img
            className=" rounded-lg shadow-2xl"
            src="http://image.tmdb.org/t/p/original/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg"
            alt="poster"
          />
        </div>
        {/* overview details */}
        <div
          className="absolute mx-2 text-white"
          style={{ right: "12px", top: "150px" }}
        >
          <div className="flex justify-between items-center">
            <div className=" text-center block">
              <h4 className="text-sm font-semibold">03-11-2000</h4>

              <h4 className="text-xs tracking-widest">Release Data</h4>
            </div>
            <div className="ml-3 text-center">
              <h4 className="text-sm font-semibold">8.3</h4>

              <div className="flex text-xs">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className="ml-3 text-center">
              <h4 className="text-sm font-semibold">110</h4>

              <h4 className="text-xs tracking-widest">Minutes</h4>
            </div>
          </div>
        </div>
        {/* title */}
        <div className="absolute mt-3" style={{ left: "175px" }}>
          <div>
            <h2 className="w-3/6 truncate text-headingColor text-xl font-bold uppercase">
              Bloodshot : Being a superhero is in his blood
            </h2>
            <h3 className="uppercase text-sm text-gray-600 font-semibold">
              SONY PICTURES
            </h3>
            <h3 className="uppercase text-sm text-gray-600 font-semibold">
              SEN &#8226; ACTION &#8226; UA{" "}
            </h3>
          </div>
        </div>
        {/* Buttons */}
        <div
          className="absolute flex justify-between items-center"
          style={{ top: "340px", left: "20px" }}
        >
          <div>
            <button
              type="button"
              className="uppercase text-sm bg-logoColor text-white font-semibold tracking-wider px-12 py-3"
            >
              Book tickets
            </button>
          </div>
          <div>
            <button
              type="button"
              className="ml-3 uppercase text-sm border-2 border-logoColor text-logoColor font-semibold tracking-wider px-8 py-3"
            >
              rate this movie
            </button>
          </div>
        </div>
        {/* Description */}
        <div className="absolute" style={{ top: "430px", left: "19px" }}>
          <div>
            <h3 className="text-headingColor font-bold text-2xl tracking-wider">
              Description
            </h3>
          </div>
          <div className="mt-3 mr-3">
            <p className="text-sm text-headingColor font-medium tracking-wide pr-1">
              After he and his wife are murdered, marine Ray Garrison is
              resurrected by a team of scientists. Enhanced with nanotechnology,
              he becomes a superhuman, biotech killing machine—'Bloodshot'. As
              Ray first trains with fellow super-soldiers, he cannot recall
              anything from his former life. But when his memories flood back
              and he remembers the man that killed both him and his wife, he
              breaks out of the facility to get revenge, only to discover that
              there's more to the conspiracy than he thought.
            </p>
          </div>
        </div>
        {/* Production Companies */}
        <div className="absolute" style={{ top: "710px", left: "19px" }}>
          <div>
            <h3 className="text-headingColor font-bold text-2xl tracking-wider">
              Production Companies
            </h3>
          </div>
          <div className="mt-8 flex justify-between items-baseline">
            {/* prod 1 */}
            <div className="">
              <center>
                <img
                  className="w-5/12"
                  src="http://image.tmdb.org/t/p/original//GagSvqWlyPdkFHMfQ3pNq6ix9P.png"
                  alt="production 1"
                />
                <h3 className="mt-2 uppercase text-xs text-headingColor font-bold tracking-wider">
                  sony Pictures
                </h3>
              </center>
            </div>
            {/* prod 2 */}
            <div className="">
              <center>
                <img
                  className="w-5/12"
                  src="http://image.tmdb.org/t/p/original//5xUJfzPZ8jWJUDzYtIeuPO4qPIa.png"
                  alt="production 2"
                />
                <h3 className="mt-2 uppercase text-xs text-headingColor font-bold tracking-wider">
                  original films
                </h3>
              </center>
            </div>
            {/* prod 3 */}
            <div className="">
              <center>
                <img
                  className="w-5/12"
                  src="http://image.tmdb.org/t/p/original//rREvQNWAxkDfY9CDn2c5YxEMPdP.png"
                  alt="production 3"
                />
                <h3 className="mt-2 uppercase text-xs text-headingColor font-bold tracking-wider">
                  cross creek pictures
                </h3>
              </center>
            </div>
          </div>
        </div>
        {/* Comments */}
        <div>
          <div
            className="mt-4 absolute bg-white w-full"
            style={{ top: "910px" }}
          >
            <div className="ml-4 mt-4">
              <h3 className="text-headingColor font-bold text-2xl tracking-wider">
                Comments
              </h3>
            </div>
            <div>
              <div className="m-4">
                <img
                  className="rounded-full shadow-lg"
                  src="https://api.adorable.io/avatars/60/pavankkpkpadadadadkpkp.png"
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
                  onClick={this.getQuotes}
                  type="button"
                  className="uppercase text-xs bg-logoColor text-white font-semibold tracking-wider px-3 py-2 rounded float-right shadow-lg"
                >
                  comment
                </button>
              </div>
            </div>
            {/* comment 1 */}
            <div className="mt-12 ml-6">
              <div className="flex items-center">
                <img
                  className="rounded-full shadow-lg"
                  src="https://api.adorable.io/avatars/40/pavankkpkpkpkp.png"
                  alt="avatar"
                />
                <h3 className="ml-2 text-xs font-bold tracking-wider">
                  Takeback Truth
                </h3>
              </div>
              <div className="ml-10 mr-3">
                <p className="text-sm">{this.state.comments}</p>
              </div>
            </div>
            {/* comment 2 */}
            <div className="mt-12 ml-6">
              <div className="flex items-center">
                <img
                  className="rounded-full shadow-lg"
                  src="https://api.adorable.io/avatars/40/pavankkpkpddddkpkp.png"
                  alt="avatar"
                />
                <h3 className="ml-2 text-xs font-bold tracking-wider">
                  Alex Diamantis
                </h3>
              </div>
              <div className="ml-10 mr-3">
                <p className="text-sm">{this.state.comments}</p>
              </div>
            </div>
            {/* comment 3 */}
            <div className="mt-12 ml-6">
              <div className="flex items-center">
                <img
                  className="rounded-full shadow-lg"
                  src="https://api.adorable.io/avatars/40/pavankp.png"
                  alt="avatar"
                />
                <h3 className="ml-2 text-xs font-bold tracking-wider">
                  Aly Khalifa
                </h3>
              </div>
              <div className="ml-10 mr-3">
                <p className="text-sm">{this.state.comments}</p>
              </div>
            </div>
            <div className="text-center my-6">
              <button className="uppercase text-sm font-semibold tracking-wider text-logoColor">
                read more
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieInfo;
