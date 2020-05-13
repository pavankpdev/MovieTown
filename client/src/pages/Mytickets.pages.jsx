import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Ticket from "../components/Myticket.component";

class Mytickets extends Component {
  constructor() {
    super();
    this.state = {
      ticketDetails: [],
    };
  }
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `/users/mytickets/get/${this.props.userRedux.user.email}`
      );

      this.setState({ ticketDetails: data.history.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="mx-4">
        <div>
          <h1 className="mt-4 text-xl text-headingColor font-bold uppercase tracking-wider lg:text-2xl">
            My Tickets
          </h1>
        </div>

        <div className="lg:flex lg:flex-wrap">
          {this.state.ticketDetails.map((data) => (
            <Ticket data={data} />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userRedux: state.auth,
});
export default connect(mapStateToProps, null)(Mytickets);
