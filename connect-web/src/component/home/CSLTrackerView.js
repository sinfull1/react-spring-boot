import React, {Component} from 'react';
import { scaleTime, scaleLinear,scaleBand } from 'd3-scale';
import {axisLeft, axisBottom} from 'd3-axis';
import { max } from 'd3-array';
import * as d3 from 'd3'
import { select } from 'd3-selection';
import './csltrackerview.css';
class CSLTrackerView extends Component {

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
    var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    const xScale = scaleTime().range([0,width]).domain([1588499706418 - 6 * 60 * 60 * 1000,   1588499706418]).nice();
    const yScale = scaleLinear().range([height, 0]).domain([0,100]);
    console.log(Date.now());

    const svg = select(this.node);
    const chart = svg.select('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xAxis = chart.select('#axisLeft').call(axisLeft(yScale));

    const yAxis = chart.select('#axisBottom').attr('transform',"translate(0,"+height+")")
                  .call(axisBottom(xScale));

 /* y.domain([
    d3.min(companies, function(c) { return d3.min(c.values, function(v) { return v.price; }); }),
    d3.max(companies, function(c) { return d3.max(c.values, function(v) { return v.price; }); })
  ]);*/
  const line = chart.append("line")
               .attr("x1", 5)
               .attr("y1", 5)
               .attr("x2", 50)
               .attr("y2", 50)
               .attr("stroke-width", 2)
               .attr("stroke", "black");










/*   d3.select(path[0][0])
      .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0] )
      .attr("stroke-dashoffset", totalLength[0])
      .transition()
        .duration(5000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

   d3.select(path[0][1])
      .attr("stroke-dasharray", totalLength[1] + " " + totalLength[1] )
      .attr("stroke-dashoffset", totalLength[1])
      .transition()
        .duration(5000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);*/
     }



  render(){
     return ( <div className="csl-tracker-view"> <svg ref={node => this.node =node}>
        <g>
            <g id="axisLeft">
            </g>
               <g id="axisBottom">
              </g>

        </g>
        </svg></div>);
   }
 }

 export default CSLTrackerView;


