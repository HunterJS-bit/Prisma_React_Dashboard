import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

var group1 = [{
        title: "Mobile",
        value: 286,
        all: 758
    },
    {
        title: "Desktop",
        value: 472,
        all: 758
    }
];

const PieChart = (props) => {

	const pirRef = useRef(null);

	const data = props.data;

	const width = 360;
	const height = 360;
	const radius = Math.min(width, height) / 2;
	const donutWidth = 75;
	const legendRectSize = 13;
	const legendSpacing = 7;

	const color = d3.scaleOrdinal()
    			.range(["#5A39AC", "#DD98D6", "#E7C820", "#08B2B2"]);

    const arc = d3.arc()
		    .innerRadius(radius - donutWidth)
		    .outerRadius(radius);

	const pie = d3.pie()
		    .value(function (d) {
		        return d.value;
		    })
		    .sort(null);

   

	useEffect(() => {
		console.log('Use effectt');


		const svg = d3.select('#pie')
				    .append('svg')
				    .attr('width', width)
				    .attr('height', height)
				    .append('g')
				    .attr('transform', 'translate(' + (width / 2) +
				        ',' + (height / 2) + ')');

		const donutTip = d3.select("#pie").append("div")
				    .attr("class", "donut-tip")
				    .style("opacity", 0);


		const path = svg.selectAll('path')
				    .data(pie(group1))
				    .enter()
				    .append('path')
				    .attr('d', arc)
				    .attr('fill', function (d, i) {
				        return color(d.data.title);
				    })
				    .attr('transform', 'translate(0, 0)')
				    .on('mouseover', function (d, i) {
				        d3.select(this).transition()
				            .duration('50')
				            .attr('opacity', '.85');
				        donutTip.transition()
				            .duration(50)
				            .style("opacity", 1);
				        let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
				        donutTip.html(num)
				            .style("left", (d3.event.pageX + 10) + "px")
				            .style("top", (d3.event.pageY - 15) + "px");

				    })
				    .on('mouseout', function (d, i) {
				        d3.select(this).transition()
				            .duration('50')
				            .attr('opacity', '1');
				        donutTip.transition()
				            .duration('50')
				            .style("opacity", 0);
				    });

			const legend = svg.selectAll('.legend')
							    .data(color.domain())
							    .enter()
							    .append('g')
							    .attr('class', 'circle-legend')
							    .attr('transform', function (d, i) {
							        var height = legendRectSize + legendSpacing;
							        var offset = height * color.domain().length / 2;
							        var horz = -2 * legendRectSize - 13;
							        var vert = i * height - offset;
							        return 'translate(' + horz + ',' + vert + ')';
							    });

			legend.append('circle')
						    .style('fill', color)
						    .style('stroke', color)
						    .attr('cx', 0)
						    .attr('cy', 0)
						    .attr('r', '.5rem');

						legend.append('text')
						    .attr('x', legendRectSize + legendSpacing)
						    .attr('y', legendRectSize - legendSpacing)
						    .text(function (d) {
						        return d;
						    });

	});

	return (<div id="pie" className="pie-chart"><h1>Pie charty </h1></div>);
}

export default PieChart;