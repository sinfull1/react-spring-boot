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


    const updateevent = (event) => {
        const update = event.data;
        const element = document.getElementById(update.split(":")[1])
        if (element.getAttribute("class") && element.getAttribute("class") !== "flex-item-en") {
            element.setAttribute("class", "flex-item-dis");
        }
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
            setTimeout(() => sseEvents.addEventListener("lock-event", updateevent), 1000);

        }).catch(result => console.log(result));
    },
        []
    )




    const findInMap = (val) => {
        if (selected) {
            for (let [k, v] of selected) {
                if (val && v && v === val && k !== localStorage.getItem("name")) {
                    console.log(k, val);
                    return true;
                }
            }
        }
        return false;
    }

    const handleClick = function () {
        LoginApi.callAPI({
            url: API_URL + "/pubran",
            method: "GET"
        });
    }

    return (
        <>
            <button className="flex-item" onClick={handleClick}>publish 100 messages</button>
            <div id="resource-box" className="flex-container">
                {all ? all.map((value, index) => {
                    return <MyButton id={value} bState="flex-item" value={value}></MyButton>
                })
                    : null}
            </div>

        </>

    )




}

const MyButton = function (props) {
    const dispatch = useDispatch();
    const [bstate, setBstate] = useState("flex-item");

    const onClick = function (event) {
        dispatch({ type: "PUBLISH", payload: { id: event.target.innerText } });
        setBstate("flex-item-en");

    }



    return (
        <>
            <button id={props.value} className={bstate} onClick={onClick}>{props.value}</button>
        </>
    )
}



