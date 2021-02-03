import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

export default function TravelSummary(props)
{
    
    
    const origin = useSelector( state => state.travel.origin);
    const destination = useSelector( state => state.travel.destination);
    const dates = useSelector( state => state.travel.dates);
    
    const dispatch = useDispatch();
   
    function getSum()
    {
       let price1 =  props.check[0].length>0?props.flights[props.check[0]].price:0 ;
       let price2 =  props.check[1].length>0?props.flights[props.check[1]].price:0;
       dispatch({ type: "SET_TOTAL", payload: { total:(price1+price2)} });
       return price1+price2;
    }

   return(
     
      <div className="summary">
       <p className="pheader1"> Travel Summary</p>
       <p>From:{origin}</p>
       <p>To:{destination}</p>
       
       <p>Price :{ props.check[0].length>0?props.flights[props.check[0]].price.toString():null}</p>
       <p>Departure :{ props.check[0].length>0?props.flights[props.check[0]].departureTime.toString():null}</p>
       <p>Arrival :{ props.check[0].length>0?props.flights[props.check[0]].arrivalTime.toString():null}</p>
       <p>Travel Date :{dates[0]}</p>
     

   <br/>
       <p>From:{destination}</p>
       <p>To:{origin}</p>
       
       <p>Price :{props.check[1].length>0?props.flights[props.check[1]].price.toString():null}</p>
       <p>Departure :{ props.check[1].length>0?props.flights[props.check[1]].departureTime.toString():null}</p>
       <p>Arrival :{ props.check[1].length>0?props.flights[props.check[1]].arrivalTime.toString():null}</p>
       <p>Travel Date :{dates[1]}</p>
     
     <h2>Total {getSum()}</h2>

     </div>
    );
}
