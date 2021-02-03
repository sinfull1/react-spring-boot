import { createSlice } from '@reduxjs/toolkit'


let initialState = {
    origin: "",
    destination: "",
    type: ["Flight"],
    dates: [new Date().toLocaleDateString(), new Date().toLocaleDateString()],
    flight: ["", ""],
    checked: [[], []],
    travels:[]
}

const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        setOrigin(state, action) {
            state.origin = action.payload.payload.newValue
        },
        setDestination(state, action) {
            state.destination = action.payload.payload.newValue
        },
        setDates(state, action) {
            
            state.dates = action.payload.payload.dates
        },
        setOriginFlight(state, action) {
                state.flight[0] = action.payload.payload.flights
                state.checked[0] = action.payload.payload.checked
 
        },
        setDestinationFlight(state, action) {
                state.flight[1] = action.payload.payload.flights
                state.checked[1] = action.payload.payload.checked
          
        },
        setTravel(state,action){
            state.travels = action.payload;
             
        }

    }
})

export const { setOrigin, setDestination, setDates, setOriginFlight ,setDestinationFlight, setTravel} = travelSlice.actions;

export default travelSlice.reducer;