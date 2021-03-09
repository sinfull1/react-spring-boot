import React, { useState, Fragment, useRef, useEffect } from "react";
import "./flight.css";
import AirportSuggest from "./airport.suggest.component";
import { useSelector, useDispatch } from "react-redux";
import CheckboxLabels from "./travel.checkbox.component";
import TravelDates from "./travel.date.component";

import TravelStub from "./travel.stub.component";
import TravelSummary from "./travel.summary.component";
export default function Step1(props) {
  const origin = useSelector((state) => state.travel.origin);
  const destination = useSelector((state) => state.travel.destination);
  const travelDate = new Date(
    useSelector((state) => state.travel.dates[0])
  ).toDateString();
  const travels = useSelector((state) => state.travel.travels);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const textInput = useRef();
  const textInput1 = useRef();
  const check = useSelector((state) => state.travel.checked);
  if (props.currentStep !== 1) {
    return null;
  }

  const onClick = function (event) {
    event.preventDefault();

    if (origin !== destination) {
      dispatch({
        type: "SET_TRAVEL",
        payload: {
          origin: origin,
          destination: destination,
          travelDate: travelDate,
        },
      });
      dispatch({
        type: "SET_FLIGHT_ORIGIN",
        payload: { flights: [], checked: [[], []] },
      });
      dispatch({
        type: "SET_DESTINATION_FLIGHT",
        payload: { flights: [], checked: [[], []] },
      });
      setToggle(true);
    }

    if (
      !origin &&
      !destination &&
      textInput.current &&
      textInput.current.style
    ) {
      textInput.current.style.background = "pink";
      textInput.current.focus();
      setInterval(function () {
        textInput.current.style.background = "rgb(235,235,235)";
      }, 100);
      setToggle(false);
    }
    if (
      origin &&
      !destination &&
      textInput1.current &&
      textInput1.current.style
    ) {
      textInput1.current.style.background = "pink";
      textInput1.current.focus();
      setInterval(function () {
        textInput1.current.style.background = "rgb(235,235,235)";
      }, 100);
      setToggle(false);
    }
  };

  const refresh = function (event) {
    dispatch({
      type: "SET_TRAVEL",
      payload: {
        origin: origin,
        destination: destination,
        travelDate: travelDate,
      },
    });
    dispatch({
      type: "SET_FLIGHT_ORIGIN",
      payload: { flights: [], checked: [[], []] },
    });
    dispatch({
      type: "SET_DESTINATION_FLIGHT",
      payload: { flights: [], checked: [[], []] },
    });
    setToggle(false);
  };
  const handleOriginToggle = (value) => () => {
    dispatch({
      type: "SET_FLIGHT_ORIGIN",
      payload: { checked: [[value], []] },
    });
  };

  const handleDestinationToggle = (value) => () => {
    dispatch({
      type: "SET_DESTINATION_FLIGHT",
      payload: { checked: [[], [value]] },
    });
  };

  function getFlights() {
    return travels.map((travel) => {
      return {
        price: travel.price,
        departureTime: new Date(travel.departureTime).toLocaleTimeString(),
        arrivalTime: new Date(travel.arrivalTime).toLocaleTimeString(),
      };
    });
  }

  return (
    <div className="step-1-group">
      <div className="step-1-checkgroup">
        <CheckboxLabels></CheckboxLabels>
      </div>
      <div className="step-1-checkgroup">
        <AirportSuggest
          fromto="Origin"
          place={origin}
          refer={textInput}
          refresh={refresh}
        ></AirportSuggest>
        <AirportSuggest
          fromto="Destination"
          place={destination}
          refer={textInput1}
          refresh={refresh}
        ></AirportSuggest>
      </div>
      <div className="step-1-checkgroup">
        <TravelDates refresh={refresh}></TravelDates>
      </div>
      <div className="step-1-checkgroup">
        <button
          className="btn btn-secondary btn-sm btn-block grey"
          onClick={onClick}
        >
          Show Travel Options
        </button>
      </div>
      {toggle ? (
        <div className="step-1-checkgroup">
          <TravelStub
            way="one"
            show={toggle}
            toggle={handleOriginToggle}
          ></TravelStub>
          <TravelStub
            way="return"
            show={toggle}
            toggle={handleDestinationToggle}
          ></TravelStub>
          <TravelSummary
            toggle={toggle}
            flights={getFlights()}
            check={check}
          ></TravelSummary>
        </div>
      ) : null}
    </div>
  );
}
