import { createSlice } from "@reduxjs/toolkit";

export interface TravelInterface {
  origin?: string;
  destination?: string;
  type?: [string];
  travelDate: string;
  dates: [string, string];
  flight?: [String, string];
  checked?: [[], []];
  travels?: [];
  travelDetails?: {};
  total?: number;
  traveller?: Traveller;
  selectTicket?: string;
}

export interface TravelAction {
  type: string;
  payload: TravelInterface;
}

export interface Traveller {
  name: string;
  email: string;
  phone: string;
}

let initialState: TravelInterface = {
  origin: "",
  destination: "",
  type: ["Flight"],
  travelDate: "",
  dates: [new Date().toLocaleDateString(), new Date().toLocaleDateString()],
  flight: ["", ""],
  checked: [[], []],
  travels: [],
  travelDetails: {},
  total: 0,
  traveller: { name: "", email: "", phone: "" },
  selectTicket: "",
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setOrigin(state: TravelInterface, action: TravelAction) {
      state.origin = action.payload.origin;
    },
    setDestination(state: TravelInterface, action: TravelAction) {
      state.destination = action.payload.destination;
    },
    setDates(state: TravelInterface, action: TravelAction) {
      state.dates = action.payload.dates;
    },
    setFlightOrigin(state: TravelInterface, action: TravelAction) {
      state.checked[0] = action.payload.checked[0];
    },
    setDestinationFlight(state: TravelInterface, action: TravelAction) {
      state.checked[1] = action.payload.checked[1];
    },
    setTravel(state: TravelInterface, action: TravelAction) {
      state.travels = action.payload.travels;
    },

    setTravelDetails(state: TravelInterface, action: TravelAction) {
      // state.travelDetails = action.payload;
    },

    setTotal(state: TravelInterface, action: TravelAction) {
      state.total = action.payload.total;
    },
    setTravellerDetails(state: TravelInterface, action: TravelAction) {
      state.traveller = action.payload.traveller;
    },
    setTicket(state: TravelInterface, action: TravelAction) {
      state.selectTicket = action.payload.selectTicket;
    },
  },
});

export const {
  setTicket,
  setTravellerDetails,
  setTotal,
  setTravelDetails,
  setOrigin,
  setDestination,
  setDates,
  setFlightOrigin,
  setDestinationFlight,
  setTravel,
} = travelSlice.actions;

export default travelSlice.reducer;
