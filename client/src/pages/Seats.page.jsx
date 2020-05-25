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
      isAuth: false,
      theaters: [],
    };
    this.onClickSignIn = this.onClickSignIn.bind(this);
  }
  // GET request made everytime the component mounts/starts
  componentDidMount() {
    // calling redux action to get the movies from store and save it to the state
    this.props.getSeatsInfo(JSON.parse(localStorage.theaterDetails));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        seats: nextProps.seatInfoRedux.seats,
        user: nextProps.userRedux.user,
        isAuth: nextProps.userRedux.isAuthenticated,
        theaters: nextProps.theaterRedux,
      });
    }
  }
  onClickSignIn() {
    localStorage.setItem("customRoute", "/movies/seats");
    window.location.href = "/auth/signin";
  }
  render() {
    return (
      <>
        <div className={this.state.isAuth ? "hidden" : "block"}>
          <center>
            <h3 className="text-lg text-headingColor font-bold">
              This is a protected page, you need to be signed in to view this
              page.
            </h3>
            <button
              className="text-base text-logoColor font-medium"
              onClick={this.onClickSignIn}
            >
              Click here to sign in.
            </button>
          </center>
        </div>
        <div className={this.state.isAuth ? "bg-white" : "hidden"}>
          <SeatsComp
            seats={this.state.seats}
            user={this.state.user}
            theaterList={this.state.theaters}
          />
          ;
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  seatInfoRedux: state.getSeatInfo.seatsInfo,
  userRedux: state.auth,
  theaterRedux: state.theaters,
});
export default connect(mapStateToProps, { getSeatsInfo })(withRouter(Seats));
