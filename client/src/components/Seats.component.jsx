import React from "react";
import { Component } from "react";

class Seats extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="flex justify-around">
        <div className="container w-6/12">
          <div className="inside-container p-3 flex flex-wrap mb-4">
            {this.props.seatsList[0].map((seat) => (
              <input
                {...seat}
                key={Math.random()}
                onChange={this.props.recordID}
              />
            ))}
          </div>
        </div>
        <div className="container w-6/12">
          <div className="inside-container p-3 flex flex-wrap mb-4">
            {this.props.seatsList[1].map((seat) => (
              <input
                {...seat}
                key={Math.random()}
                onChange={this.props.recordID}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Seats;
