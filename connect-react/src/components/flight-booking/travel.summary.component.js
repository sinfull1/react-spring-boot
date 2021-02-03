import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function TravelSummary(props)
{
    
    
    const origin = useSelector( state => state.travel.origin);
    const destination = useSelector( state => state.travel.destination);
   
   return(
     (props.toggle?
      <div className="summary">
       <p className="pheader">Origin Summary</p>
       <p>{origin}</p>
       <p>{destination}</p>
       <p>{props.flights[0][props.check[0]]}</p>
     

       <p className="pheader">Destination Summary</p>
       <p>{destination}</p>
       <p>{origin}</p>
       <p>{props.flights[1][props.check[1]]}</p>
     


     </div>:null)
    );
}
