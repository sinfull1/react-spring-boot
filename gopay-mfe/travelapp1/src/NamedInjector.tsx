import MasterForm from "./MasterForm";
import React from "react";
import travelReducer from "./slices/travel.slice";
import store from "./store";

// TODO: investigating better way of injecting reducer at runtime
const NameWithInjector = () => {
  React.useEffect(() => store.injectReducer("travel", travelReducer), []);

  return <MasterForm></MasterForm>;
};
export default NameWithInjector;
