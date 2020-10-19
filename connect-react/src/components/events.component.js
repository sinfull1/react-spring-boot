import React, { useState } from 'react';

let id =  Math.random().toString(36).substr(2, 9);
console.log(id);
let sseEvents = new EventSource("http://localhost:8000/getHttp?userId="+ id);
sseEvents.onopen = event => console.log('open', event);
sseEvents.onerror = event  => {
    console.log("Server side shut");
    sseEvents.close();
   }
export default function Events(props)  {
    const { user: currentUser } = props;
    console.log(localStorage.getItem("user"))
	const [status, setStatus] = useState("");

 // <2>
    sseEvents.onmessage = event => {
	  const update = event.data; // <3>
	  console.log(update);
      setStatus(update); // <4>
    };
  
  
	function activateLasers(e){
		e.preventDefault();
        return fetch('http://localhost:8000/event?eventType='+id);
	}




     return(
		
        <div className="stock-group-wrapper">
		<button onClick={activateLasers}>
	      	Activate Lasers
	     </button>
        {status}

        </div>
    );

}
