import React, { Component } from 'react';

interface Stock {
  id: String;
  code: String;
  price: Number;
}

interface StockListProps {
}

interface StockListState {
  stocks: Array<Stock>;
  isLoading: boolean;
}

class StockList extends Component<StockListProps, StockListState> {

  constructor(props: StockListProps) {
    super(props);

    this.state = {
      stocks: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const response = await fetch('http://localhost:3000/initPrices');
    const data = await response.json();
    console.log(data);
    this.setState({stocks: data, isLoading: false});

    const eventSource = new EventSource('http://localhost:8080/getPrices'); // <1>
    eventSource.onopen = (event: any) => console.log('open', event); // <2>
    eventSource.onmessage = (event: any) => {
      const stock = JSON.parse(event.data).source; // <3>
      this.state.stocks.push(stock);
      this.setState({stocks: this.state.stocks}); // <4>
    };
    eventSource.onerror = (event: any) => console.log('error', event);
  }

  render() {
    const {stocks, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Stock List</h2>
        {stocka.map((stock: Stock) =>
          <div key={stock.id}>
            {stock.code}<br/>
          </div>
        )}
        <a href="/" className="App-link">Home</a>
      </div>
    );
  }
}

export default StockList;
