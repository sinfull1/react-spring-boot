
import React, { Component,Fragment} from "react";
import GooglePayment from '../../payment/payment.component';
import {useSelector} from 'react-redux';
import TravelSummary from "./travel.summary.component";
export default function Step3(props) {
   
    const travels = useSelector(state => state.travel.travels);
   
    const check = useSelector(state => state.travel.checked);
    const traveller = useSelector(state => state.travel.traveller);
    if (props.currentStep !== 3) {
      return null
    } 
        
    
    function getFlights() {
      return travels.map(travel => {
          return {
              price: travel.price,
              departureTime: new Date(travel.departureTime).toLocaleTimeString(),
              arrivalTime: new Date(travel.arrivalTime).toLocaleTimeString()  
          }
      });
  }
    return(
      <div>
      <div className="summary">
        <p className="pheader1"> Traveller Details</p>
       <p>Traveller Name: {traveller.name}</p>
       <p>Traveller Email: {traveller.email}</p>
       <p>Traveller phone: {traveller.phone}</p>
       </div>
      <TravelSummary toggle={true} flights={getFlights()} check={check}></TravelSummary>
      <GooglePayment></GooglePayment>
      </div>
      
    );
  }