/*
*    main.js
*/

var dataCircles = []

d3.csv("data/ages.csv").then((data)=> {

	console.log(data);

});

d3.tsv("data/ages.tsv").then((data)=> {

	console.log(data);

});

d3.json("data/ages.json").then((data)=> {
	data.forEach((d)=>{
		d.age = +d.age;
        dataCircles.push(d.age)
	});
	console.log(data);
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var circles = svg.selectAll("circle")
        .data(dataCircles);

    circles.enter()
        .append("circle")
            .attr("cx", (d,i)=> {return i*50 +100})
            .attr("cy", (d,i)=> {return i +100})
            .attr("r", (d)=>{return d*2;})
            .attr("fill",(d)=>{
                if(d > 10){
                    return ("blue");
                } else {
                    return ("red");
                }
            });
}).catch((error) => {consolelog(error);});


