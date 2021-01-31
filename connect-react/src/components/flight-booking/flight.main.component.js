import React, { Component,Fragment} from "react";
import Step1 from './flight.step.1';
import Step2 from './flight.step.2';
import Step3 from './flight.step.3';
import {useSelector} from 'react-redux';
import './flight.css';

class MasterForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        currentStep: 1,
        email:  '',
        username: '',
        password: '', 
      }
    }
     
  
    handleChange = event => {
      event.preventDefault();
      const {name, value} = event.target
      this.setState({
        [name]: value
      })    
    }
     
    handleSubmit = event => {
      event.preventDefault();
      const { email, username, password } = this.state
      alert(`Your registration detail: \n 
             Email: ${email} \n 
             Username: ${username} \n
             Password: ${password}`)
             event.preventDefault();
    }
    
    _next = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
      
    _prev = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({
        currentStep: currentStep
      })
    }
  
  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <3){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }
    return null;
  }
    
    render() {    
      return (
        <div className="flightContainer">
        <h4>Travel Assistant</h4>
        <div className ="statebar">
        {this.state.currentStep==1?<p className="steplight">Plan</p> : <p>Plan</p>}
        {this.state.currentStep==2?<p className="steplight">Reserve</p> : <p>Reserve</p>}
        {this.state.currentStep==3?<p className="steplight">Pay</p> : <p>Pay</p>}
        </div>
        <form onSubmit={this.handleSubmit}>
        {/* 
          render the form steps and pass required props in
        */}

          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            email={this.state.email}
          />
          <Step2 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            username={this.state.username}
          />
          <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            password={this.state.password}
          />
          {this.previousButton()}
          {this.nextButton()}
  
        </form>
        </div>
      );
    }
  }
  

  
export default MasterForm;