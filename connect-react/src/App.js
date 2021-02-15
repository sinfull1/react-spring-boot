import React  from "react";
import {useDispatch, useSelector} from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Events from "./components/events.component";
import Booking from "./components/booking.component";

import CSLContainer from './charts/CSLContainer';
import { logout } from "./slices/auth.slice";

import { history } from './helpers/history';
import UploadFiles from "./upload/upload-files.component";

import GooglePayment from "./payment/payment.component";
import Header from "./components/header.component";
import KafkaPublisher from "./components/publisher/kafka-component";

export default function App(props) {


  const currentUser = localStorage.getItem("user");



    return (
      <Router history={history}>
         <div className="container mt-3">
             <Header/>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {currentUser ?<Route exact path="/upload"   component={UploadFiles} />
              :<Route exact path="/upload"   component={Login} />}
              {currentUser ?<Route exact path="/eventGrid"   component={Events} />
              :<Route exact path="/eventGrid"   component={Login} />}
               {currentUser ?<Route exact path="/d3"   component={CSLContainer} />
                            :<Route exact path="/d3"   component={Login} />}
              <Route exact path="/payment" component = {GooglePayment} />
              {currentUser ?<Route exact path="/book"   component={Booking} />
              :<Route exact path="/book"   component={Login} />}
              {currentUser ?<Route exact path="/kafka"   component={KafkaPublisher} />
              :<Route exact path="/kafka"   component={Login} />}
            </Switch>
          </div>

      </Router>
    );
  }



