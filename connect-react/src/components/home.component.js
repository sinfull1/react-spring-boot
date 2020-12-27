import React, { Component } from "react";

import UserService from "../services/user.service";
import {  Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return !localStorage.getItem("user")?
     (
      <div className="container">
        <header className="jumbotron">
          <h3>Sid Blog</h3>
          <p>Following are some scribbles from the coding learning and experiences </p>
          <b>Please  <Link to={"/login"}> Login </Link> to see the main page</b>
         
        </header>
      </div>
    )
    :
    (  <div className="container">
         <header className="jumbotron">
       <p><Link to={"/eventGrid"}> Event Grid </Link>with Adhoc reactivity design</p>
       <p><Link to={"/upload"}> Upload </Link> Download functionality on with filesystem </p>
       <p><Link to={"/kafka"}> Kafka </Link> high transaction simulator</p>
       <p><Link to={"/spark"}> Spark </Link> for file based analytics</p>
       <p><Link to={"/d3"}> D3 Charts </Link> with high repaint</p>


      </header>
      </div>
    );
  }
}
