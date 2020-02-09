import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const Chart = (props) => {

	const chartData = props.data;

	const chartRef = useRef(null);

	const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

	useEffect(
        () => {
        	
 			var svg = d3.select("#graph").append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", 
			          "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scaleBand()
			          .range([0, width])
			          .padding(0.1);
			var y = d3.scaleLinear()
			          .range([height, 0]);

			 // Scale the range of the data in the domains
			x.domain(chartData.map(function(d) { return d.date; }));
			y.domain([0, d3.max(chartData, function(d) { return d.count; })]);

			// add the x Axis
			svg.append("g")
			      .attr("transform", "translate(0," + height + ")")
			      .call(d3.axisBottom(x));

			// add the y Axis
			svg.append("g")
				      .call(d3.axisLeft(y));


			 // append the rectangles for the bar chart
			 svg.selectAll(".bar")
			    .data(chartData)
			    .enter().append("rect")
			      .attr("class", "bar")
			      .attr("x", function(d) { return x(d.date); })
			      .attr("width", x.bandwidth())
			      .attr("y", function(d) { return y(d.count); })
			      .attr("height", function(d) { return height - y(d.count); });
        
    });

	return (<div id="graph" className="chart" ref={chartRef}>
		</div>);
}


export default Chart;