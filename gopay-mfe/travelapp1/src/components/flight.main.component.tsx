import React, { useState } from "react";
import Step1 from "./flight.step.1";
import Step2 from "./flight.step.2";
import Step3 from "./flight.step.3";
import { useSelector } from "react-redux";
import "./flight.css";

export default function SubMasterForm(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const check = useSelector((state) => state.travel.checked);
  const traveller = useSelector((state) => state.travel.traveller);

  const _next = function () {
    let newStep = currentStep;
    newStep = newStep >= 2 ? 3 : newStep + 1;
    setCurrentStep(newStep);
  };

  const _prev = function () {
    let newStep = currentStep;
    newStep = newStep <= 1 ? 1 : newStep - 1;
    setCurrentStep(newStep);
  };

  const previousButton = function () {
    if (currentStep !== 1) {
      return (
        <button className="btn btn-secondary" type="button" onClick={_prev}>
          Previous
        </button>
      );
    }
    return null;
  };

  const nextButton = function () {
    if (currentStep == 1 && check[0].length > 0 && check[1].length > 0) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={_next}
        >
          Next
        </button>
      );
    }
    if (currentStep == 2 && traveller.email && traveller.email.length > 0) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={_next}
        >
          Next
        </button>
      );
    }
    if (currentStep == 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={_next}
        >
          Next
        </button>
      );
    }
    return null;
  };

  return (
    <div className="flightContainer">
      <h4>Travel Assistant</h4>
      <div className="statebar">
        {currentStep == 1 ? <p className="steplight">Plan</p> : <p>Plan</p>}
        {currentStep == 2 ? (
          <p className="steplight">Reserve</p>
        ) : (
          <p>Reserve</p>
        )}
        {currentStep == 3 ? <p className="steplight">Pay</p> : <p>Pay</p>}
      </div>
      <form>
        <Step1 currentStep={currentStep} />
        <Step2 currentStep={currentStep} />
        <Step3 currentStep={currentStep} />
        {previousButton()}
        {nextButton()}
      </form>
    </div>
  );
}
