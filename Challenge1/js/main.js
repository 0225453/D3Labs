/*
*    main.js
*/

var dataRect = []

d3.json("data/buildings.json").then((data)=> {
	data.forEach((d)=>{
		d.height = +d.height;
        dataRect.push(d.height)
	});
	console.log(data);
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 1000)
        .attr("height", 1000);

        var rectangles = svg.selectAll("rect")
        .data(dataRect);
    
        rectangles.enter()
            .append("rect")
                .attr("x", (d,i)=> {return i*60})
                .attr("y", (d,i)=> {var y = 828-d; return y})
                .attr("width", 40)
                .attr("height", (d)=>{return d;})
                .attr("fill","red");

}).catch((error) => {consolelog(error);});


