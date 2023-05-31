/*
*    main.js
*/

d3.json('data/revenues.json').then((data) => {
    
    var margin = {left:100, right:10,top:10,bottom:100}; 
    var width = 600-margin.left-margin.right;
    var height = 500-margin.top-margin.bottom;
    
    var svg = d3.select("#chart-area")
      .append("svg")
        .attr("width", 600 + margin.right + margin.left)
        .attr("height", 500 + margin.top + margin.bottom)
    
    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
        
    var months = data.map((d) => { return d.month; });
      
    var x = d3.scaleBand()
        .domain(months)
        .range([0, 600])
        .paddingInner(0.3)
        .paddingOuter(0.3);
      
    var y = d3.scaleLinear()
        .domain([0, 55000])
        .range([height,0]);
        
    var rects = g.selectAll("rect").data(data)

    rects.enter()
        .append('rect')
            .attr('x', (d) => x(d.month))
            .attr('y', (d) => y(d.revenue))
            .attr('width', x.bandwidth())
            .attr('height', (d) => height- y(d.revenue))
            .attr('fill', 'yellow');
    
    var bottomAxis = d3.axisBottom(x);
    g.append("g")    
        .attr("class", "bottom axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "translate(20,0)");
    
    var yAxisCall = d3.axisLeft(y)
        
        .tickFormat((d) => { return d/1000 + "K"; });
    g.append("g")
        .attr("class", "left axis")
        .call(yAxisCall);

    g.append("text")
        .attr("class", "x axis-label")
        .attr("x", (width / 2))
        .attr("y", height + 140)
        .attr("font-size", "24px")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(40, -80)")
        .text("Month");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("font-size", "24px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Revenue (dlls)");
        
}).catch((error) => {console.log(error);});