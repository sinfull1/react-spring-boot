import React, { Component } from 'react';
import './cslcontainer.css'
import CSLBlockView from './CSLBlockView';
//event = new EventSource("http://localhost:8000/getPrices");
import CSLBarView from './CSLBarView';
import CSLTrackerView from './CSLTrackerView';
import CSLStrategyView from './CSLStrategyView';

class CSLContainer  extends Component {


  constructor(props) {
    super(props);
    this.state = {
      eventSource: null,
      sector: "GROUP1",
      stocks: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    this.props.events.onopen = event => console.log('open', event); // <2>
    this.props.events.onmessage = event => {
      const update = JSON.parse(event.data); // <3>
      this.setState({stocks: update.lisStocks}); // <4>
    };
    this.props.events.onerror = event  => {
     console.log("Server side shut");
     this.props.events.close();
     this.setState({eventSource: null});
    }
  }

  componentWillUnMount()
  {
    this.props.eventSource.close();
    this.setState({eventSource: null});
  }

  render() {
    const {eventSource, stocks, isLoading} = this.state;
     return(
        <div className="stock-group-wrapper">
         <CSLTrackerView stocks={stocks}/>

        </div>
    );
  }
}

export default CSLContainer;

