import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import './home.css'
import MenuComponent from "./MenuComponent";
import Upload from "../upload/Upload";
class HomeComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

     return (
        <div className="home-wrapper">
          <div className="page-header">
                <MenuComponent/>
          </div>
          <div className="page-main">
                 <Upload/>
          </div>
          <div className="page-footer">
                <MenuComponent/>
          </div>
        </div>
    );
  }
}

export default HomeComponent;
