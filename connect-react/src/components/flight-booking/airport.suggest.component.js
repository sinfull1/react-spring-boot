import Autosuggest from 'react-autosuggest';
import React,{useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {airports} from '../../api/data';
import './airportsuggest.css';
var _ = require('lodash');

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
    //let hh = airports.map(e=> {return e.country});
    //console.log(new Set(hh));
    var t = _.groupBy(airports,function(airport)
    {
        return airport.city + "," + airport.state;
    })
    
    let g =  Object.keys(t)
      .map(function (key,index) {
        if( regex.test(key) || regex.test(t[key].name))
        return    {
          title: key,
          ports: t[key] 
        }
         }
      ).filter(r=> r!=undefined);
    return g;
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.name +"-" + suggestion.code ;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.name +"-" + suggestion.code}</span>
    );
  }
  
  function renderSectionTitle(section) {
    return (
      <strong>{section.title}</strong>
    );
  }
  
  function getSectionSuggestions(section) {
    return section.ports;
  }
  
  export default function AutoSuggest (props) {
   
    const [value, setValue] = useState(props.place);
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();

  
   const  onChange = function (event, { newValue, method }){
      setValue( newValue)
      if(props.fromto==="Origin") dispatch({ type: "SET_ORIGIN", payload:{newValue} });
      if(props.fromto==="Destination")  dispatch({ type: "SET_DESTINATION", payload:{newValue} });
    };

    const onClick = (event) => {
        event.target.select();
      };
    
   const onSuggestionsFetchRequested = function ({ value })  {
      setSuggestions( getSuggestions(value))
    };
  
    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
  
    
      const inputProps = {
        placeholder: props.fromto,
        value,
        onChange: onChange,
        onClick: onClick
      };
  
      return (
        <Autosuggest 
          multiSection={true}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={getSectionSuggestions}
          inputProps={inputProps} />
      );

  }

  
  