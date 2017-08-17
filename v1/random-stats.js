document.addEventListener("DOMContentLoaded", () => {

  const accountValues = document.getElementsByClassName("account-value");

  var accountValueArr = [];
  let leftover = 105000;

  Array.from(accountValues).forEach((valueHolder, index) => {
    let value = (index == 2) ? leftover : ((Math.random() * 500) + 1) * 100;
  	accountValueArr.push(value);
    valueHolder.innerHTML = value;
    leftover -= value;
  });

  accountSum = accountValueArr.reduce((a, b) => { return a + b; }, 0);

  document.getElementById("account-sum").innerHTML = accountSum;

  var accountValueBar = d3.selectAll(".account-value-bar")
    .data(accountValueArr)

  accountValueBar.append("div")
    .attr("class", "progression")
    .style("width", (data) => { return (data / accountSum * 100) + "%"; });

  accountValueBar.append("div")
    .attr("class", "remainder")
    .style("width", (data) => { return "calc(" + (100 - (data / accountSum * 100)) + "% - 2px)"; });

  d3.selectAll(".activity-score")
    .classed("condensed-number", true)
    .html((data, index) => {
      return accountValueArr[index%3] * Math.floor(Math.random()*5 + 1);
    });

});