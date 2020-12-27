import React, {Component} from 'react';
import { scaleLinear,scaleBand } from 'd3-scale';
import {axisLeft, axisBottom} from 'd3-axis';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import './cslbarview.css';
class CSLBarView extends Component {

  constructor(props)
  {
   super(props);
     this.state = {
        firstRender: true,
        chart: null

    }
    this.drawChart = this.drawChart.bind(this)
   // this.updateChart = this.updateChart.bind(this)
  }
   componentDidUpdate() {
      this.state.firstRender = false;
      this.drawChart()
   }
  drawChart() {
         const margin = 60;
         const height = 500 - 2 * margin;
         const width =  600 - 2 * margin;
         const xScale = scaleBand().range([0,width]).domain(this.props.stocks.map((s)=> s.stockName)).padding(0.2);
         const yScale = scaleLinear().range([height,0]).domain([0,100]);
         const svg = select(this.node);
         const chart = svg.select('g').attr('transform','translate(60,60)');
         chart.select('#axisLeft').call(axisLeft(yScale));
         chart.select('#axisBottom').attr('transform','translate(0, 380)').call(axisBottom(xScale))
         chart.selectAll('rect').data(this.props.stocks).enter().append('rect');
         chart.selectAll('rect').data(this.props.stocks).exit().remove();
         chart.selectAll('rect').data(this.props.stocks)
                             .attr('x', (s) => xScale(s.stockName))
                             .attr('y', (s) => yScale(s.stockPrice))
                             .attr('height', (s) => 380 - yScale(s.stockPrice))
                             .attr('width', xScale.bandwidth());
     }



  render(){
     return ( <div className="csl-bar-view"> <svg ref={node => this.node =node}>
        <g>
            <g id="axisLeft">
            </g>
               <g id="axisBottom">
              </g>

        </g>
        </svg></div>);
   }
 }

 export default CSLBarView;


