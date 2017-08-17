document.addEventListener("DOMContentLoaded", () => {
  const data = [
    {name: "1-20", accounts: 20},
    {name: "20-40", accounts: 30},
    {name: "40-60", accounts: 20},
    {name: "60-80", accounts: 10},
    {name: "80-100", accounts: 20}
  ];

  var width = 250,
    height = 230,
    radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal()
    .range(["#F47521", "#168DC6", "#91AD41", "#E03A00", "#E8CF89"]);

  var arc = d3.arc()
    .innerRadius(radius - 55)
    .outerRadius(radius - 10);

  var pie = d3.pie()
    .sort((a, b) => {return b-a;})
    .value((d) => {return d.accounts;});

  var svg = d3.select(".doughnut")
    .attr("width", width)
    .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc")
      .on("mouseover", (d) => {pieMouseOver(d.data)})
      .on("mouseout", pieMouseOut);

  g.append("path")
    .attr("d", arc)
    .style("fill", (d) => { return color(d.data.name); });

  function pieMouseOver(data) {
    d3.select("#pie-tooltip").transition().duration(200).style("opacity", .9);      
   
    d3.select("#pie-tooltip").html(pieTooltipHtml(data))
      .style("left", (d3.event.pageX) + "px")  
      .style("top", (d3.event.pageY - 28) + "px");
  }
  
  function pieMouseOut(){
    d3.select("#pie-tooltip").transition().duration(500).style("opacity", 0);      
  }

  function pieTooltipHtml(data) {
    return "<h4>"+data.name+"</h4><table>"+
      "<tr><td>Accounts</td><td>"+(data.accounts)+"</td></tr>"+
      "</table>";
  }
});