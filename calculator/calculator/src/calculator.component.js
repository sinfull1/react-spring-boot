import React, { Component, useEffect, useState,useRef } from "react";
import './calculator.css';

export default function Calculator()
{
    const[caltext, setCaltext] = useState("");
    const buttontext = ["(",")","C","X","7","8","9","/","4",
                       "5","6","*","1","2","3","-","0",".","=","+"]
      
    const handleClick = function (index,event)
    {
       event.preventDefault();
       let newText = event.target.innerText + caltext;
       console.log(index);
       setCaltext(newText);
    }

    return(
        <div className="calculator">
           <input className="textbox" type="textbox" value={caltext}></input>
           {buttontext.map((value,index) =>{return <button className="button" 
             onClick={(event)=>handleClick(index,event)} label={value} >{value}</button>})}
         </div>
    );
    


}


