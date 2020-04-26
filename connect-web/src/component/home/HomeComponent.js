import React, { Component } from 'react';


event = new EventSource("http://localhost:8000/getPrices");

class StockList extends Component {


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
    this.state.eventSource = event;
    this.setState({isLoading: true});
    this.state.eventSource.onopen = event => console.log('open', event); // <2>
    this.state.eventSource.onmessage = event => {
      const update = JSON.parse(event.data); // <3>
      this.setState({stocks: update.lisStocks}); // <4>
    };
    this.state.eventSource.onerror = event  => console.log('error', event);
  }

  createHeaders() {
    this.state.stocks.map(stock => {
      return <th>{stock.stockCode}</th>
    });
  }

  createContent() {

  }


  render() {
    const {eventSource, stocks, isLoading} = this.state;
     return(
           <table>
          <thead>
            <tr>
                <th>Stock Code</th>
                <th>Stock Price</th>
             </tr>
            </thead>
             <tbody>

              {stocks.map(stock =>
              <tr>
                  <td>{stock.stockCode}</td>
                  <td>{stock.stockPrice}</td>
                               </tr>

              )}
             </tbody>
           </table>
    );
  }
}

export default StockList;
