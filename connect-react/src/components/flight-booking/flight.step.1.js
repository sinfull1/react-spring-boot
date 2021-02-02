import React, { useState, Fragment, useRef,useEffect } from "react";
import './flight.css'
import AirportSuggest from './airport.suggest.component';
import { useSelector, useDispatch } from 'react-redux';
import CheckboxLabels from './travel.checkbox.component';
import TravelDates from './travel.date.component';
import { schedule } from '../../api/schedule';
import TravelStub from "./travel.stub.component";
export default function Step1(props) {
    const origin = useSelector(state => state.travel.origin);
    const destination = useSelector(state => state.travel.destination);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const textInput = useRef();
    const textInput1 = useRef();
    if (props.currentStep !== 1) {
        return null
    }
    




    const onClick = function (event) {
        event.preventDefault();
        
        if(origin!==destination  )
        {
            setToggle(true);
        }
        
        if(!origin && !destination && textInput.current && textInput.current.style){
            textInput.current.style.background="pink";
            textInput.current.focus();
            setInterval(function(){textInput.current.style.background="rgb(235,235,235)" }, 100);
            setToggle(false);
        
        }
        if(origin && !destination && textInput1.current &&  textInput1.current.style){
            textInput1.current.style.background="pink";
            textInput1.current.focus();
            setInterval(function(){textInput1.current.style.background="rgb(235,235,235)" }, 100);
            setToggle(false);
        }    
        
       
       
    }

    return (

        <div className="step-1-group">
            <div className="step-1-checkgroup">
                <CheckboxLabels ></CheckboxLabels>

            </div>
            <div className="step-1-checkgroup">
                <AirportSuggest fromto="Origin" place={origin}  refer={textInput}></AirportSuggest>
                <AirportSuggest fromto="Destination" place={destination} refer={textInput1}></AirportSuggest>
            </div>
            <div className="step-1-checkgroup">
                <TravelDates></TravelDates>
            </div>
            <div className="step-1-checkgroup">
                <button className="btn btn-secondary  btn-sm btn-block grey" onClick={onClick} >Show Travel Options</button>
            </div>

            {toggle?<TravelStub way="one" show={toggle}></TravelStub>:null}
            {toggle?<TravelStub way="return" show={toggle}></TravelStub>:null}
        </div>
    );
}
