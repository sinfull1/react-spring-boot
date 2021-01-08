import React, { Component } from 'react';
import './cslcontainer.css'
import CSLBlockView from './CSLBlockView';

import CSLBarView from './CSLBarView';
import CSLTrackerView from './CSLTrackerView';




class CSLContainer  extends Component {


  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    const events = new EventSource("https://www.gopaychain.in/getPrices");
    this.setState({isLoading: true});
    events.onopen = event => console.log('open', event); // <2>
    events.onmessage = event => {
      const update = JSON.parse(event.data); // <3>
      this.setState({stocks: update.lisStocks}); // <4>
    };
    events.onerror = event  => {
     console.log("Server side shut");
     events.close();
     this.setState({eventSource: null});
    }
  }

  

  render() {
    const {stocks, isLoading} = this.state;
    console.group(this.state);
     return(
        <div className="stock-group-wrapper">
         <CSLTrackerView stocks={stocks} variable={1}/>
         <CSLTrackerView stocks={stocks}variable={0}/>
         <CSLBarView stocks={stocks}/>
         <CSLBlockView stocks={stocks}/>
        </div>
    );
  }
}

export default CSLContainer;

