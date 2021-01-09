import React, { Component } from 'react';
import { scaleTime, scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';
import * as d3 from 'd3'
import { select } from 'd3-selection';
import './csltrackerview.css';
import CSLSlider from './CSLSlider';

class CSLTrackerView extends Component {

   constructor(props) {
      super(props);
      this.state = {
         chart: null,
      }
      this.drawChart = this.drawChart.bind(this)
      var prevPrice = 0;
      var prevTime = 0;
      var initialTime =Date.now();
   }

   async componentDidMount() {
  
      this.prevPrice = 0;
      this.prevTime = 0;
      this.initialTime =Date.now();;


   }

   async componentDidUpdate() {
      this.drawChart();
      
   }
   drawChart() {
      //Margin is requied to be inside the viewport for axes
      var margin = { top: 10, right: 40, bottom: 20, left: 40 };
      var width = 500 - margin.left - margin.right;
      var height = 150 - margin.top - margin.bottom;
      //division below is time delta divided in the width
      let widthOfSvg = document.getElementById("tracker").width.baseVal.value - margin.left - margin.right;;
      let xScale = scaleTime().range([0, width]).domain([this.initialTime, this.initialTime+  50 * 1000]).nice();
      const yScale = scaleLinear().range([height, 0]).domain([0, 100]);
      const svg = select(this.node);
      const chart = svg.select('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      const xAxis = chart.select('#axisLeft').call(axisLeft(yScale));
      const yAxis = chart.select('#axisBottom').attr('transform', "translate(0," + height + ")") .call(axisBottom(xScale));
      const curve = d3.line().curve(d3.curveNatural);
      var hScale = height / 100;
      const points = [[this.prevTime ,  (height - (this.prevPrice) * hScale)], 
                      [(this.prevTime + width/110) , (height - (this.props.stocks.map(s => s.stockPrice)[this.props.variable]) * hScale)]];
      chart
           .append('path')
           .attr('d', curve(points))
           .attr('stroke', 'steelblue')
           .attr('fill', 'none');
      if(this.prevTime && this.prevTime>widthOfSvg-75)
      {
         this.prevTime=0
         chart.selectAll("path").remove();
         this.initialTime=Date.now();
      }
      this.prevPrice = this.props.stocks.map(s => s.stockPrice)[this.props.variable];
      this.prevTime = this.prevTime +  width/110;
   }

   render() {
      return (
         <div className="csl-tracker-view">
            <div><CSLSlider></CSLSlider></div>
            <div >
               <svg ref={node => this.node = node} id="tracker">

                  <g>
                     <g id="axisLeft">
                     </g>
                     <g id="axisBottom">
                     </g>
                  </g>
               </svg></div>
         </div>);
   }
}

export default CSLTrackerView;


