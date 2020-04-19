import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import './menu.css'
class MenuComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
     <div className="head-container">
           <div className="item item-1">File Upload</div>
     </div>

    );
  }
}

export default MenuComponent;
