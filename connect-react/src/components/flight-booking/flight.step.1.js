import React, { useState, Fragment } from "react";
import './flight.css'
import AirportSuggest from './airport.suggest.component';
import { useSelector } from 'react-redux';
import CheckboxLabels from './travel.checkbox.component';
import TravelDates from './travel.date.component';
import { schedule } from '../../api/schedule';
import TravelStub from "./travel.stub.component";
export default function Step1(props) {
    const origin = useSelector(state => state.travel.origin);
    const destination = useSelector(state => state.travel.destination);
    const [toggle, setToggle] = useState(false);

    if (props.currentStep !== 1) {
        return null
    }

    const onClick = function (event) {
        event.preventDefault();
        console.log(origin);
        if( origin && destination)
        {
            setToggle(true);
        }
 

    }

    return (

        <div className="step-1-group">
            <div className="step-1-checkgroup">
                <CheckboxLabels></CheckboxLabels>

            </div>
            <div className="step-1-checkgroup">
                <AirportSuggest fromto="Origin" place={origin}></AirportSuggest>
                <AirportSuggest fromto="Destination" place={destination}></AirportSuggest>
            </div>
            <div className="step-1-checkgroup">
                <TravelDates></TravelDates>
            </div>
            <div className="step-1-checkgroup">
                <button className="btn btn-secondary  btn-sm btn-block grey" onClick={onClick} >Show Travel Options</button>
            </div>

            {toggle?<TravelStub way="one"></TravelStub>:null}
            {toggle?<TravelStub way="return"></TravelStub>:null}
        </div>
    );
}
