/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
	.attr("height", 400);

var circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 150)
	.attr("r", 30)
	.attr("fill", "orange");

var rect = svg.append("rect")
	.attr("x", 220)
	.attr("y", 20)
	.attr("width", 60)
	.attr("height", 20)
	.attr("fill","purple");