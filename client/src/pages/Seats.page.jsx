import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { getSeatsInfo } from "../redux/reducers/seatsReducer/seats.action";
import { connect } from "react-redux";
import SeatsComp from "../components/SelectSeats.component";
class Seats extends Component {
  constructor() {
    super();
    this.state = {
      seats: [],
      user: [],
    };
  }
  // GET request made everytime the component mounts/starts
  componentDidMount() {
    // calling redux action to get the movies from store and save it to the state
    this.props.getSeatsInfo(this.props.location.state.theaterDetails);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {

      this.setState({ seats: nextProps.seatInfoRedux.seats, user: nextProps.userRedux });
    }
  }
  render() {
    return (
      <div className="bg-white">
        <SeatsComp seats={this.state.seats} user={this.state.user} />;
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  seatInfoRedux: state.getSeatInfo.seatsInfo,
  userRedux: state.auth.user,
});
export default connect(mapStateToProps, { getSeatsInfo })(withRouter(Seats));
