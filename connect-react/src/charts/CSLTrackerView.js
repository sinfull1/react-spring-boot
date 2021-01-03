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
        chart: null,
        initialTime: 0,
    }
    this.drawChart = this.drawChart.bind(this)
    var prevPrice = 0;
    var prevTime = 0;
  }

   async componentDidMount() {
    await this.setState( { initialTime:Date.now()});
    this.prevPrice = 0;
    this.prevTime = Date.now();

   }

   async componentDidUpdate() {
      this.drawChart()
   }
  drawChart() {
    var margin = {top: 20, right: 50, bottom: 30, left: 50};
    var width = 500 - margin.left - margin.right;
    var height = 200 - margin.top - margin.bottom;

    const xScale = scaleTime().range([0,width]).domain([1588499706418 - 6 * 60 * 60 * 1000,   1588499706418]).nice();
    const yScale = scaleLinear().range([height, 0]).domain([0,100]);
    const svg = select(this.node);
    const chart = svg.select('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const xAxis = chart.select('#axisLeft').call(axisLeft(yScale));
    const yAxis = chart.select('#axisBottom').attr('transform',"translate(0,"+height+")")
                  .call(axisBottom(xScale));
     var timeDelta = (Date.now() - this.state.initialTime)/300;

     var path = chart.append("path")
              .attr("stroke","grey")
              .attr("stroke-width", 1)
              .attr("fill","none");
     console.log(timeDelta);

    var hScale = height/100;
    var pathData = [ "M " + this.prevTime + " " + (height-(this.prevPrice)*hScale)
                    + " L " + timeDelta +" "+ (height-(this.props.stocks.map(s=> s.stockPrice)[this.props.variable])*hScale)];

    path.data(pathData)
                  .attr("d", function(d) {
                       return d;
                  });
    this.prevPrice = this.props.stocks.map(s=> s.stockPrice)[this.props.variable];
    this.prevTime = timeDelta;
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


