/*
*    main.js
*/

d3.json('data/buildings.json').then((data) => {
    var svg = d3.select("#chart-area").append("svg")
        .attr('width', 500)
        .attr('height', 500);
    
    var height = data.map((d) => +d.height);

    var x = d3.scaleBand()
      .domain(height)
      .range([0, 500]) 
      .paddingInner(0.3)
      .paddingOuter(0.3);

    var y = d3.scaleLinear()
      .domain([0, 828])
      .range([0, 500]);

    var color = d3.scaleOrdinal()
      .domain(height)
      .range(d3.schemeSet3);

    var rectangles = svg.selectAll('rect')
      .data(height);

    rectangles.enter()
        .append('rect')
            .attr('x', (d) => x(d))
            .attr('y', (d) => 500 - y(d))
            .attr('width', 50)
            .attr('height', (d) => y(d))
            .attr('fill', (d) => color(d));
      
  }).catch((error) => {console.log(error);});