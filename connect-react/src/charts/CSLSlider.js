import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import './cslslider.css';
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const upload = (event) => {
    console.log("called");
  }

  return (
    <div className="flux-rate">
      <Typography id="continuous-slider" gutterBottom>
        Flux Rate (Under work)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
      </Grid>
      <div className="flux-button">
      <button    onClick={upload} >Change rate</button></div>
    </div>
  );
}