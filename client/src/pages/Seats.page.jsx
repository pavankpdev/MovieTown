import React from "react";
import { Component } from "react";

import SeatsComp from "../components/SelectSeats.component";
class Seats extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="bg-white">
        <SeatsComp />
      </div>
    );
  }
}

export default Seats;
