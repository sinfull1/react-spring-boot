import React, { Component } from 'react';
import './cslblockview.css';
function CSLBlockView(props) {

     return(
         <div className="container">
         <h2> Large Cap Stocks </h2>
           <table>
            <thead>
             <tr>
                <th>Stock Code</th>
                <th>Stock Price</th>
             </tr>
             </thead>
             <tbody>
              {props.stocks.map(stock =>
                <tr>
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