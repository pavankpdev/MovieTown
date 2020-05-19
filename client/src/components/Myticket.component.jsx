import React, { Component } from "react";
import QRCode from "qrcode.react";
class Ticket extends Component {


  render() {
    return (
      <div
        className="valid mt-3 lg:w-4/12 lg:mr-2"
      >
        <div
          className="w-full bg-white border-l-4 rounded-md shadow-lg flex justify-around items-center py-2 lg:w-full"
          style={{ borderColor: "#5a67d8" }}
        >
          <div className=" py-2">
            <img
              className="rounded-lg lg:w-32"
              src={`http://image.tmdb.org/t/p/w92${this.props.data.poster}`}
              alt="123"
            />
          </div>
          <div className="">
            <h3 className="text-lg font-bold text-headingColor lg:text-2xl">
              {this.props.data.movie_name}
            </h3>

            <h4 className="text-xs uppercase font-semibold text-gray-500">
              {this.props.data.type} | {this.props.data.quantity} - seats |{" "}
              {this.props.data.date} |{this.props.data.time}
            </h4>
            <h3 className="text-lg font-bold text-headingColor">Garuda Mall</h3>
            <p className="text-xs font-light w-48 truncate text-gray-600 lg:text-sm lg:w-64">
              {this.props.data.theater_address}
            </p>
            <div className="flex justify-around items-center mt-3">
              <h3 className="text-lg font-bold text-headingColor lg:text-2xl">
                ₹
                {this.props.data.price * this.props.data.quantity +
                  this.props.data.quantity * 60}
              </h3>
              <QRCode
                value="http://image.tmdb.org/t/p/w92//4VlXER3FImHeFuUjBShFamhIp9M.jpg"
                size={50}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Ticket;
