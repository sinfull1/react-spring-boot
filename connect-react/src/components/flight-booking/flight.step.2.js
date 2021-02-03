import React,{useState} from "react";
import {useDispatch } from 'react-redux';

export default function Step2(props) {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState();
   const dispatch = useDispatch();
   const handleuChange= function(event)
   {
    setName(event.target.value);
   }
   const handleeChange= function(event)
   {
     
    setEmail(event.target.value);
   }

   const handlepChange= function(event)
   {
    setPhone(event.target.value);
   }


   const onClick = function (event) {
    event.preventDefault();

    if(name && email && phone)
    {
      dispatch({ type: "SET_TRAVELLER_DETAILS", payload: { name: name, email:email, phone:phone } });
    }
}
   


    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="username">Traveller's Name</label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          placeholder="Enter username"
          value={name}
          onChange={handleuChange}
          autocomplete="on"
          />

     <label htmlFor="email">Traveller's Email</label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={handleeChange}
          autocomplete="on"
          />
      <label htmlFor="email">Traveller's Phone</label>
        <input
          className="form-control"
          id="phone"
          name="phone"
          type="number"
          placeholder="Enter Phone"
          value={phone}
          onChange={handlepChange}
          autocomplete="on"
          />
          <div className="step-1-checkgroup">
                <button className="btn btn-secondary btn-sm btn-block grey" onClick={onClick} >Set Traveller</button>
            </div>

      </div>
    );
  }