import React, { Component, useEffect, useState } from "react";
import "./kafka.css";
import { useDispatch } from 'react-redux';
import EventService from '../../services/event.service';

import LoginApi from '../../api/login.interface';
import { API_URL } from '../../settings';


let sseEvents;
var map = new Map();

export default function KafkaPublisher() {
    const dispatch = useDispatch();
    const [all, setAll] = useState([]);
    const [selected, setSelected] = useState();
    const [clientSelected, setClientSelected] = useState();

   
    const updateevent = (event) =>{
        const update = event.data;
        const newmap = new Map();
        map.set(update.split(":")[0], update.split(":")[1])
        for(const [key,value] of map)
        {
         newmap.set(key,value);
        }
        
        setSelected(newmap);
    }
   
    
    useEffect(() => {
        sseEvents = EventService.getConsumeEvent();
         LoginApi.callAPI({
            url: API_URL + "/booking",
            method: "GET"
        }).then(result => {
            if (result.status == 200) {
                setAll(result.data)
            }
        }).catch(result => console.log(result));
        LoginApi.callAPI({
            url: API_URL + "/conagg",
            method: "GET"
        }).then(result => {
            let jjj = new Map();
            for (var value in result.data) {
                jjj.set(value, result.data[value])
                if (value === localStorage.getItem("name")) {
                    setClientSelected(result.data[value])
                }
            }
            map = jjj;
            setSelected(jjj);
            setTimeout(()=> sseEvents.addEventListener("lock-event", updateevent),1000);
            
        }).catch(result => console.log(result));},
        []
    )



const onClick = function (event) {
    dispatch({ type: "PUBLISH", payload: { id: event.target.innerText } });
    setClientSelected(event.target.innerText);
}

const findInMap = (val) => {
    if(selected)
    {
    for (let [k, v] of selected) {
        if (val && v && v === val && k !== localStorage.getItem("name")) {
            console.log(k,val);
            return true;
        }
    }
    }
    return false;
}

return (
    <>
        <div id="resource-box" className="flex-container">

            {all ? all.map((value, index) => {

                if (value === clientSelected) {
                    return (<button id={value} className="flex-item-en" onClick={onClick}>{value}</button>);
                }
                else if (findInMap(value)) {
                    return (<button id={value} className="flex-item-dis" disabled >{value}</button>);
                }
                else {
                    return (<button id={value} className="flex-item" onClick={onClick} >{value}</button>);
                }

            })
                : null}
        </div>

    </>

)



}
