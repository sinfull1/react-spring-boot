import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './flight.css';
import { isPropertySignature } from 'typescript';

export default function CheckboxLabels(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedF: false,
    checkedG: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
      <div className="checkBox">
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Flights"
      />
 <FormControlLabel
        control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
        label="Trains"
      />
       <FormControlLabel
        control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
        label="Cabs"
      />
       <FormControlLabel
        control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" />}
        label="Bikes"
      />

    </FormGroup>
    </div>
  );
}
