import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {useSelector,useDispatch} from 'react-redux';
import { TextRotateVerticalSharp } from '@material-ui/icons';
import './flight.css';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginRight: '10px',
  },
}));

export default function TravelStub(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let check = useSelector(state => props.way==="return"?state.travel.checked[1]:state.travel.checked[0]);
  let origin = useSelector(state => state.travel.origin);
  let destination = useSelector(state => state.travel.destination);
  let travels = useSelector(state => state.travel.travels);
  let dates = useSelector(state => state.travel.dates);
 
  

  //const [checked, setChecked] = React.useState(props.way==="return"?check[1]:check[0] );
  if(props.way==="return")
  {
      [origin,destination] =[destination,origin]
  }
  let flights 
  if(travels.length>0)
  {
    flights = travels.map(travel =>{  
         return  {price: travel.price,
                  travelDate: dates[props.way==="return"?1:0],
                  departureTime: new Date(travel.departureTime).toLocaleTimeString(),
                  arrivalTime: new Date(travel.arrivalTime).toLocaleTimeString()        
                 }});
  }          
  
  const getString= function(value)
  {
    return "Price: " + value.price+ " Travel Date:" + value.travelDate + " Departure Date: " + value.departureTime + 
    " Arrival Time:" + value.arrivalTime;

  }
  return (
    (props.show &&origin.length>6 && destination.length>6 && origin!==destination?
    <List dense className={classes.root}>
      <p className="pheader">{origin+ " TO " +destination}</p>
      {flights.map((value,index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${index + 1}`}
                src={`spicejet.png`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={getString(value)} secondary="SpiceJet" />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={props.toggle(index)}
                checked= {check.indexOf(index) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>:null
  ));
}
