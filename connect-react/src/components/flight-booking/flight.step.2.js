import React from "react";
export default function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="form-group">
        <label htmlFor="username">Traveller's Name</label>
        <input
          className="form-control"
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={props.username}
          onChange={props.handleChange}
          />

     <label htmlFor="email">Traveller's Email</label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="text"
          placeholder="Enter Email"
          value={props.email}
          onChange={props.handleChange}
          />
      <label htmlFor="email">Traveller's Phone</label>
        <input
          className="form-control"
          id="phone"
          name="phone"
          type="number"
          placeholder="Enter Phone"
          value={props.email}
          onChange={props.handleChange}
          />


      </div>
    );
  }