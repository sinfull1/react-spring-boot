import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Events from "./components/events.component";
import CSLContainer from './charts/CSLContainer';

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
import UploadFiles from "./upload/upload-files.component";




import GooglePayment from "./payment/payment.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        
      });
    }
  }
  isLoggedIn()
  {
           return AuthService.isLoggedIn();
  }



  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    let currentUser = localStorage.getItem("user");
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
             Sid Blog
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/home" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={"/upload"} className="nav-link">
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/eventGrid"} className="nav-link">
                    EventGrid
                  </Link>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <div className="navbar-nav ml-auto">
                
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
               
                </div>

               
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {currentUser ?<Route exact path="/upload"   component={UploadFiles} />
              :<Route exact path="/upload"   component={Login} />}
              {currentUser ?<Route exact path="/eventGrid"   component={Events} />
              :<Route exact path="/eventGrid"   component={Login} />}
              
              <Route exact path="/d3" component = {CSLContainer} />
              <Route exact path="/payment" component = {GooglePayment} />
            
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
