
import React, { Component,Fragment} from "react";
import GooglePayment from '../../payment/payment.component';
import {useSelector} from 'react-redux';
export default function Step3(props) {
    const flights = useSelector(state => state.travel.flight);
    if (props.currentStep !== 3) {
      return null
    } 
    
    
    return(
      <React.Fragment>
     {flights}
      <GooglePayment></GooglePayment>
    
      </React.Fragment>
    );
  }