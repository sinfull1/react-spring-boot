import React, { Component, useEffect, useState } from "react";
import "./kafka.css";
import { useDispatch } from 'react-redux';
import EventService from '../../services/event.service';

import LoginApi from '../../api/login.interface';
import { API_URL } from '../../settings';




let sseEvents = EventService.getConsumeEvent();


export default function KafkaPublisher() {
    const dispatch = useDispatch();
    const [all, setAll] = useState([]);
    const [selected, setSelected] = useState(new Map());
    const [clientSelected, setClientSelected] = useState();


    useEffect(() => {
        LoginApi.callAPI({
            url: API_URL + "/booking",
            method: "GET"
        }).then(result => {
            if (result.status == 200) {
                setAll(result.data)
            }
        })
            .catch(result => console.log(result));
        ;
        LoginApi.callAPI({
            url: API_URL + "/conagg",
            method: "GET"
        }).then(result => {
            var map = new Map()
            for (var value in result.data) {
                map.set(value, result.data[value])
                if (value === localStorage.getItem("name")) {
                    setClientSelected(result.data[value])
                }
            }
            setSelected(map);
            sseEvents.addEventListener("lock-event", function (event) {
                const update = event.data;
                let newselect = new Map();
                for(const[key,value ] of map)
                {
                    newselect.set(key,value);
                }
                newselect = newselect.set(update.split(":")[0], update.split(":")[1])
                map =newselect;
                setSelected(newselect);
                
            });

        }
    )
        .catch(result => console.log(result));
    ;
},
[]
    )



const onClick = function (event) {
    dispatch({ type: "PUBLISH", payload: { id: event.target.innerText } });
    setClientSelected(event.target.innerText);
}

const findInMap = (map, val) => {
    for (let [k, v] of map) {
        if (val && v && v === val && k !== localStorage.getItem("name")) {
            return true;
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
                if (findInMap(selected, value)) {
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
