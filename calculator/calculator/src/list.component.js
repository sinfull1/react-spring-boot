import ReactDOM from "react-dom";
import React, { useState } from "react";

export default function ListComponent() {
  const [list, setList] = useState([0, 1, 2, 3, 4, 5]);

  return (
    <div>
      {list.map((v) => {
        return (<div><ListItem index={v} />
        </div>)
      })}
    </div>
  );
}

const ListItem = function (props) {
  const [textin, setTextin] = useState("")
  const [index, setIndex] = useState(props.index)
  const onChangeHandler = function (event, index) {
    setTextin(event.target.value);
  };

  const removeHandler = function (event, index) {
    const element = document.getElementById("list" + index);
    element.style.display = "none";
    event.target.style.display = "none";
  };

  return (
    <div id={"list" + index}>
      <label>Input with id = {index} </label>
      <input
        type="text"
        onChange={(event) => onChangeHandler(event, index)}
        value={textin}
      />
      <label onClick={(event) => removeHandler(event, index)}> x</label>
    </div>
  )

}



ReactDOM.render(<ListComponent />, document.querySelector("#root"));
