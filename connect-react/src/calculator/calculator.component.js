import React, { Component, useEffect, useState,useRef } from "react";
import './calculator.css';

export default function Calculator()
{
    const[caltext, setCaltext] = useState("0");
    const buttontext = ["(",")","C","X","7","8","9","div","4",
                       "5","6","mul","1","2","3","neg","0",".","=","+"]
      
    const handleClick = function (event)
    {
       event.preventDefault();
       let newText = newText + caltext;
       setCaltext(newText);
    }

    return(
        <div id="calculator">
           <input  type="text">{caltext}</input>
           
         </div>
    );
    


}


