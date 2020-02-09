import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const Chart = (props) => {

	const chartData = props.data;

	const chartRef = useRef(null);

	const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

	useEffect(
        () => {
        	const svg = d3.select(chartRef.current)
    				.append("svg")
    				.attr("width", width)
    				.attr("height", height)
    				.style("border", "1px solid black");

    		const yScale = d3.scaleLinear()
    				.range([height, 0])
    				.domain([0, 100]);

    		svg.append('g')
    			.call(d3.axisLeft(yScale));
    });

	return (<div className="chart" ref={chartRef}>
		</div>);
}


export default Chart;