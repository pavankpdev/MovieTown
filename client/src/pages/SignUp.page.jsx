import React, { Component } from "react";

import AuthTemplate from "../components/auth/AuthTemplate.component";
class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
        fullName: "",
        email:"",
        password:""
    }
  }

 

  render() {
    return (
      <div>
        <AuthTemplate title="Hi! new to" subtitle1="Fill up the form and we
'll get you on board." btnText="sign up" finalText="signup"  inputs={[{
          type:"text", name:"fullName", id:"fullName", placeholder: "Full name", icon: "user"
        },{
          type:"email", name:"email", id:"email", placeholder: "Email", icon: "envelope"
        },{
          type:"password", name:"password", id:"password", placeholder: "Password", icon: "lock"
        }]} />
      </div>
    );
  }
}

export default SignUpPage;
