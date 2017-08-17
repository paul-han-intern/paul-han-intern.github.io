document.addEventListener("DOMContentLoaded", () => {
  var groups = [0, 0, 0, 0, 0];
  for (var i=0; i<1000; i++) {
    let score = Math.random() * 100;
    if (score <= 20) groups[0] = groups[0] + 1;
    if (score <= 40 && score >= 20) groups[1] = groups[1] + 1;
    if (score <= 60 && score >= 40) groups[2] = groups[2] + 1;
    if (score <= 80 && score >= 60) groups[3] = groups[3] + 1;
    if (score <= 100 && score >= 80) groups[4] = groups[4] + 1;
  }
  groups.sort((a, b) => { return a - b; });

  var icons = ["csv-icon.png", "crm-icon.png", "database-icon.png", "digital-marketing.png", "sales-icon.png"];
  
  var margin = {top: 20, right: 10, bottom: 20, left: 50},
    width = 250 - margin.left - margin.right,
    height = 230 - margin.top - margin.bottom,
    iconSpace = 40;

  var barWidth = width / groups.length;

  var x = d3.scaleBand()
    .domain(["CSV", "CRM", "DB", "WEB", "SALES"])
    .rangeRound([0, width]);
  
  var y = d3.scaleLinear()
    .domain([0, d3.max(groups)])
    .range([height, 0]);

  var xAxis = d3.axisBottom(x);
  var yAxis = d3.axisLeft(y);
  
  var chart = d3.select(".vertical-bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  var bar = chart.selectAll("g")
    .data(groups)
    .enter().append("g")
      .attr("transform", (d, i) => {return "translate(" + (i*barWidth + margin.left + 4) + "," + (y(d) + margin.top + iconSpace) + ")";});

  bar.append("rect")
    .attr("width", barWidth - 8)
    .attr("height", (d) => { return height - y(d) - iconSpace; });

  bar.data(icons).append("image")
    .attr("xlink:href", (d) => { return d; })
    .attr("width", barWidth - 8)
    .attr("height", barWidth - 8)
    .attr("transform", "translate(0, -" + barWidth + ")");

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")")
    .call(xAxis);

  chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    .call(yAxis)
      .selectAll("text")
      .attr("x", -30);
});