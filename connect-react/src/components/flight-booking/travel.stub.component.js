import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {useSelector,useDispatch} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TravelStub(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let check = useSelector(state => props.way==="return"?state.travel.checked[1]:state.travel.checked[0])
  let origin = useSelector(state => state.travel.origin);
  let destination = useSelector(state => state.travel.destination);


  //const [checked, setChecked] = React.useState(props.way==="return"?check[1]:check[0] );
  if(props.way==="return")
  {
      [origin,destination] =[destination,origin]
    
  }

  let flights = origin + " TO "+ destination + " Rs."+Math.random()*1000 + "  Timing:" + new Date().toLocaleTimeString()

  const handleToggle = (value) => () => {
    
    dispatch({type:"SET_FLIGHT", payload:{flights:flights,checked:[value],way: props.way}})
  
  };

  return (
    (props.show &&origin.length>6 && destination.length>6 && origin!==destination?
    <List dense className={classes.root}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`spicejet.png`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={flights} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={check.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>:null
  ));
}
