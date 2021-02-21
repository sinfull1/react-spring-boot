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
import GooglePayButton from "@google-pay/button-react";
import { Kafka } from "kafkajs";

export default function App(props) {


  



    return (
      <Router history={history}>
         <div className="container">
        
            <Switch>
              <Route exact path={["/", "/home","/login"]} component={()=> {return (<><Header/><Home/></>)}} />
              <Route exact path="/register" component={()=> {return (<><Header/><Register/></>)}} />
              <Route exact path="/upload"   component={()=> {return (<><Header/><UploadFiles/></>)}} />
              <Route exact path="/eventGrid"   component={()=> {return (<><Header/><Events/></>)}} />
              <Route exact path="/d3"   component={()=> {return (<><Header/><CSLContainer/></>)}} />
              <Route exact path="/payment" component = {()=> {return (<><Header/><GooglePayButton/></>)}} />
              <Route exact path="/book"   component={()=> {return (<><Header/><Booking/></>)}} />
              <Route exact path="/kafka"   component={()=> {return (<><Header/><KafkaPublisher/></>)}} />
              </Switch>
          </div>

      </Router>
    );
  }



