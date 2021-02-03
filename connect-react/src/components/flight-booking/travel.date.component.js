import React, { useState,useEffect } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {useDispatch, useSelector} from 'react-redux';


import './daterange.css';
const now = new Date();


export default function TravelDates(props) {
  const fromDate = new Date(useSelector( state=> state.travel.dates[0]));
  const toDate = new Date(useSelector( state=> state.travel.dates[1]));
  const [value, setValue] = useState([fromDate, toDate]);
  const dispatch = useDispatch();

 function onChange(event){
   props.refresh();
   setValue(event);
 }

  let dates =[]
  try{
   dates = value.map( date => date.toLocaleDateString() )
  }
  catch{
      dates=[];
     
  }
  dispatch({type:"SET_DATES", payload:{dates}})
  return (
    <div className="Sample">
      <header>
        <h1>Travel Dates</h1>
      </header>
      <div className="Sample__container">
        <main className="Sample__container__content">
          <DateRangePicker
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            onChange={onChange}
            value={value}
            yearAriaLabel="Year"
          />
        </main>
      </div>
    </div>
  );
}