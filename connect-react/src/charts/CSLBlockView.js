import React, { Component } from 'react';
import './cslblockview.css';
function CSLBlockView(props) {

     return(
         <div className="csl-block-view">
         <h2> Large Cap Stocks </h2>
           <table className="table100 ver1 m-b-110">
            <thead>
             <tr className="row100 head">
                <th>Stock Code</th>
                <th>Stock Price</th>
             </tr>
             </thead>
             <tbody>
              {props.stocks.map(stock =>
                <tr className="row100">
                  <td>{stock.stockCode}</td>
                  <td>{stock.stockPrice}</td>
                </tr>
              )}
             </tbody>
           </table>

           </div>
         );


 }

 export default CSLBlockView;