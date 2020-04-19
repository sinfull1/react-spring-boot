import React, { Component } from "react";
import "./App.css";
import Upload from "./upload/Upload";
import HomeComponent from "./component/HomeComponent";
class App extends Component {
  render() {
    return (
      <div className="App">
          <HomeComponent />
      </div>
    );
  }
}

export default App;
