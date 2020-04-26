
import "./App.css";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Router,Route, Switch } from 'react-router-dom';
import AuthenticationService from './service/AuthenticationService';
import StockList from "../component/home/HomeComponent";
import LoginComponent from '../component/login/LoginComponent';
import LogoutComponent from '../component/login/LogoutComponent';
import RegisterComponent from '../component/login/RegisterComponent';


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentDidUpdate(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }



  render() {
   const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    if (isUserLoggedIn) {
      return (
        <div className="App">
             <Switch>
                 <Route exact path="/" component={StockList}/>
              </Switch>
        </div>
      );
    }
   else{
    return (
      <div className="App">
      <Switch>
           <Route path="/" component={StockList} />
       </Switch>
      </div>
    );
  }
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
