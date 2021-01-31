import React, { useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useDispatch} from "react-redux";
import {reload} from '../slices/auth.slice'
import {Redirect} from "react-router-dom";

import MasterForm from './flight-booking/flight.main.component'

export default function Booking(props) {
   const[ticket, setTickets] = useState([]);
   const[product, setProduct]  = useState([]);


 

return (
        <div> 
        <MasterForm></MasterForm>
        </div>
)



  }
