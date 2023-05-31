/*
*    main.js
*/


d3.json('data/buildings.json').then((data) => {
    data.forEach((d)=>{
		d.height = +d.height;
	});
    var margin = {left:100, right:10,top:10,bottom:100}; 
    var width = 600-margin.left-margin.right;
    var height = 400-margin.top-margin.bottom;
    
    var svg = d3.select("#chart-area")
      .append("svg")
        .attr("width", 600 + margin.right + margin.left)
        .attr("height", 400 + margin.top + margin.bottom)
    
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
        
    var buildings = data.map((d) => { return d.name; });
      
    var x = d3.scaleBand()
        .domain(buildings)
        .range([0, 600])
        .paddingInner(0.3)
        .paddingOuter(0.3);
      
    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([height, 0]);
        
    var rects = g.selectAll("rect").data(data)

    rects.enter()
        .append('rect')
            .attr('x', (d) => x(d.name))
            .attr('y', (d) =>  y(d.height))
            .attr('width', x.bandwidth())
            .attr('height', (d) => height - y(d.height))
            .attr('fill', 'gray');
    
    var bottomAxis = d3.axisBottom(x);
    g.append("g")    
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");
    
    var yAxisCall = d3.axisLeft(y)
        .ticks(5)
            .tickFormat((d) => { return d + "m"; });
    g.append("g")
        .attr("class", "left axis")
        .call(yAxisCall);

    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", (width / 2))
        .attr("y", height + 140)
        .attr("font-size", "24px")
        .attr("text-anchor", "middle")
        .text("The word's tallest buildings");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "24px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Height (m)");
        
}).catch((error) => {console.log(error);});