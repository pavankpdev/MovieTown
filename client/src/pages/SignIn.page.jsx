import React, { Component } from "react";

import AuthTemplate from "../components/auth/AuthTemplate.component";
class SigninPage extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div>
        <AuthTemplate title="Welcome back to" subtitle1="Sign in to know more about new released" subtitle2="movies and discounts available." btnText="sign in" finalText="signin" reset inputs={[{
          type:"email", name:"email", id:"email", placeholder: "Email", icon: "envelope"
        },{
          type:"password", name:"password", id:"password", placeholder: "Password", icon: "lock"
        }]} />
      </div>
    );
  }
}

export default SigninPage;
