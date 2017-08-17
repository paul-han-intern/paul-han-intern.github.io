document.addEventListener("DOMContentLoaded", () => {
  var accounts = [];
  for (let i=0; i<5; i++) {
    accounts[i] = [];
    for (let j=0; j<5; j++) {
      accounts[i][j] = Math.random() * 500;
    }
  }
  var contacts = accounts.map((account) => {
    return account.map((sub) => {
      return sub * ((Math.random() * 2) + 1);
    });
  });
  var sample = []
  for (let i=0; i<5; i++) {
    sample[2*i] = [...accounts[i]];
    sample[(2*i)+1] = [...contacts[i]];
  }
  
  var margin = {top: 10, right: 20, bottom: 20, left: 130},
    width = 524 - margin.left - margin.right,
    barHeight = 17,
    barPadding = 3;

  var x = d3.scaleLinear()
    .domain([0, d3.max(contacts.map((contact) => {
      return contact.reduce((a, b) => { return a + b; });
    }))])
    .range([0, width]);

  var y = d3.scaleBand()
    .domain(["Administration", "Communications", "Finance", "HR", "Sales"])
    .rangeRound([2 * barHeight * accounts.length, 0]);

  var color = d3.scaleOrdinal()
    .range(["#F47521", "#168DC6", "#91AD41", "#E8CF89", "#E03A00"]);

  var xAxis = d3.axisBottom(x).ticks(5);
  var yAxis = d3.axisLeft(y);
  
  var chart = d3.select(".horizontal-bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", (barHeight * sample.length) + margin.top + margin.bottom);

  var bar = chart.selectAll("g")
    .data(sample)
    .enter().append("g")
      .attr("transform", (data, index) => {
        return "translate(" + margin.left + "," + ((index * barHeight) + margin.top + barPadding) + ")";
      });

  var rect = bar.selectAll("rect")
    .data((data) => { return data; })
    .enter().append("rect")
      .attr("transform", (data, index) => {
        if (index == 0) {
          translateX = data;
          return "translate(0, 0)";
        } else {
          temp = translateX;
          translateX += data;
          return "translate(" + x(temp) + ", 0)";
        }
      })
      .attr("width", (data) => { return x(data); })
      .attr("height", barHeight - (2 * barPadding));

  rect.attr("fill", (d, i) => {
    if (i < 5) {
      return color(i);
    } else {
      return color(i-5);
    }
  });

  chart.append("g")
    .attr("class", "x job-axis")
    .attr("transform", "translate(" + margin.left + ", " + ((barHeight * sample.length) + margin.top) + ")")
    .call(xAxis);

  chart.append("g")
    .attr("class", "y job-axis")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
    .call(yAxis)
      .selectAll("text")
      .attr("x", -70);

  chart.selectAll(".job-axis")
    .selectAll("line")
    .remove();
});