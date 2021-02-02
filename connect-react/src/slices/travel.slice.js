import { createSlice } from '@reduxjs/toolkit'


let initialState = {
    origin: "",
    destination: "",
    type: ["Flight"],
    dates: [new Date().toLocaleDateString(), new Date().toLocaleDateString()],
    flight: ["", ""],
    checked: [[], []]
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
        setFlight(state, action) {
            if (action.payload.payload.way === "one") {
                state.flight[0] = action.payload.payload.flights
                state.checked[0] = action.payload.payload.checked
            }
            else {
                state.flight[1] = action.payload.payload.flights
                state.checked[1] = action.payload.payload.checked
            }
        }
    }
})

export const { setOrigin, setDestination, setDates, setFlight } = travelSlice.actions;

export default travelSlice.reducer;