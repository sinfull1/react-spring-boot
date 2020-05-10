import React, {Component} from 'react';
import './cslstrategyview.css';
class CSLStrategyView extends Component {

  constructor(props)
  {
   super(props);
     this.state = {
        strategy: {}
    }
  }

     async componentDidMount() {
         const response = await fetch('http://localhost:8000/getStrategy');
         const data = await response.json();
        this.setState({strategy: data});
      }

   componentDidUpdate() {
      this.state.firstRender = false;
   }



  render(){
    const stocks = this.props.stocks;
    const pnl = stocks.map(stock => stock.stockPrice * this.state.strategy[stock.stockCode]);

    const sum = pnl.reduce(function(a, b) { return a + b; }, 0);

     return ( <div className="csl-strategy-view">
                    <h2>Equity Strategy </h2>
           <table className="table100 ver1 m-b-110">
                       <thead>
                        <tr className="row100 head">
                           <th>Stock Code</th>
                           <th>Stock Price</th>
                        </tr>
                        </thead>
                         <tbody>
                       {
                              Object.keys(this.state.strategy).map((key, index) => (
                                   <tr className="row100">
                                   <td>{key} </td>
                                   <td>{this.state.strategy[key]}</td>
                                   </tr>
                             ))
                       }
                  </tbody>
           </table>
        <a> Strategy PNL: {sum} </a>
             </div>);
   }
 }

 export default CSLStrategyView;


