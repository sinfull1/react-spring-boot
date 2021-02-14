
import { createSlice } from '@reduxjs/toolkit'



let initialState = {
    origin: "",
    destination: "",
    type: ["Flight"],
    dates: [new Date().toLocaleDateString(), new Date().toLocaleDateString()],
    flight: ["", ""],
    checked: [[], []],
    travels:[],
    travelDetails:{},
    total:0,
    traveller:[],
    selectTicket: ""
    
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
                
                state.checked[0] = action.payload.payload.checked
 
        },
        setDestinationFlight(state, action) {
                
                state.checked[1] = action.payload.payload.checked
          
        },
        setTravel(state,action){
            state.travels = action.payload;
             
        },

        setTravelDetails(state,action)
        {
            state.travelDetails=action.payload;
        },

        setTotal(state,action)
        {
            state.total = action.payload.payload.total;
        },
        setTravellerDetails(state,action)
        {
            state.traveller = action.payload.payload;
        },
        setTicket(state,action)
        {
            state.selectTicket =action.payload.payload;
        }
       
    }
})

export const { setTicket,setTravellerDetails,setTotal, setTravelDetails,setOrigin, setDestination, setDates, setOriginFlight ,setDestinationFlight, setTravel} = travelSlice.actions;

export default travelSlice.reducer;