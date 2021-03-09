import React from "react";
import "./App.css";
import SubMasterForm from "../src/components/flight.main.component";
import store from "./store";
import { Provider } from "react-redux";

function MasterForm() {
  return (
    <div className="App">
      <Provider store={store}>
        <SubMasterForm></SubMasterForm>
      </Provider>
    </div>
  );
}

export default MasterForm;
