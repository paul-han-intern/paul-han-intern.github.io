document.addEventListener("DOMContentLoaded", () => {
  
  const industries = ["Energy", "Finance", "Health Care", "IT"],
    companies = ["Ameren", "NextEra", "PPL", "Duke Energy", "Engie", "National Grid", "EDF", "Enel", "Dominion Energy",
      "Pacific Gas and Electric", "Southern California Edison", "Consolidated Edison", "Georgia Power", "DTE Energy",
      "Consumers Energy", "Unisource Energy", "Xcel Energy", "Avangrid", "Ambit Energy", "Wells Fargo", "Bank of America",
      "Chase", "Goldman Sachs", "Citigroup", "Morgan Stanley", "PNC", "Capital One", "TD Bank",
      "Barclays", "McKesson", "CVS Health", "UnitedHealth Group", "AmerisourceBergen", "Express Scripts", "Cardinal Health",
      "Walgreens Boots Alliance", "Johnson & Johnson", "Anthem", "Apple", "Samsung", "Amazon", "Foxconn", "Google",
      "Microsoft", "Hitachi", "IBM", "Huawei", "Sony", "US Bancorp", "HSBC", "State Street", "Charles Schwab", "BB&T",
      "Credit Suisse", "SunTrust Bank", "Deutsche Bank", "Ally Financial", "American Express", "21st Century Insurance", "AARP",
      "Berkshire Hathaway", "Blue Advantage", "Blue Cross Blue Shield", "Fortis", "Kaiser Permanente", "Kaleida Health",
      "Thrivent Financial", "Falafel Software", "Forsythe", "Impinj"],
    personas = ["Fred", "Pippen", "Penny", "Sue"],
    activityLevels = ["Active", "Hibernating", "Inactive"];

  companies.sort();

  companies.filter((name) => { return Math.random() < 0.1; }).forEach((company) => {
    d3.select("#right-col-body").append("div").html('<img style="width: 20%;" src="images/logos/' + company + '.png" />'
      + '<span style="color: #E8CF89;display: inline-block; vertical-align: top; padding-top: 15px; margin-left: 15px; font-weight: bold;">' + company + '</span>')
      .style("padding", "15px");
  });

  d3.select("#metric-more-options").on("click", () => {
    d3.select("#metric-menu").style("visibility", "visible");
  });
  
  d3.selectAll(".picker-item").on("click", () => {
    if (d3.event.target.className == "picker-item") {
      d3.select(d3.event.target).classed("active", true);
    } else {
      d3.select(d3.event.target).classed("active", false);
    }
  });

  d3.selectAll(".picker-sub-item").on("click", () => {
    if (d3.event.target.className == "picker-sub-item") {
      accounts = accounts.filter((account) => { return Math.random() < 0.8; });
      showPlaycards(accounts);
      d3.select(d3.event.target).classed("disabled", true);
    } else {
      accounts = companies.filter((name) => { return accounts.includes(name) || Math.random() > 0.5; });
      showPlaycards(accounts);
      d3.select(d3.event.target).classed("disabled", false);
    }
  });

  d3.select("#more-options-button").on("click", () => {
    d3.select("#dimension-menu").style("visibility", "visible");
  });

  d3.selectAll(".dimension-option").on("click", () => {
    d3.select("#dimensions-selected").append("div")
      .html(d3.event.target.innerHTML)
      .attr("class", "dimension-selected")
      .on("click", () => {
        d3.select(d3.event.target).remove();
      });
  });

  d3.selectAll(".metric-option").on("click", () => {
    d3.select("#metrics-selected").append("div")
      .html(d3.event.target.innerHTML)
      .attr("class", "metric-selected")
      .on("click", () => {
        d3.select(d3.event.target).remove();
      });
  });

  d3.select("#apply-selection-button").on("click", () => {
    d3.select("#dimension-menu").style("visibility", "hidden");

    d3.select("#dimension-picker-body").html('<p style="color: #FFF; font-weight: bold;">Active Dimensions</p>');
    d3.selectAll(".dimension-selected").nodes().forEach((dimension) => {
      d3.select("#dimension-picker-body").append("div")
        .html(dimension.innerHTML)
        .attr("class", "dimension-active");
    });

    d3.select("#dimension-picker-body").append("button")
      .attr("id", "more-options-button")
      .html("Change Selection")
      .on("click", () => {
        d3.select("#dimension-menu").style("visibility", "visible");
      });

    showPlaycards(companies);
  });

  d3.select("#apply-metrics-button").on("click", () => {
    d3.select("#metric-menu").style("visibility", "hidden");

    d3.select("#metric-picker-body").html('<p style="color: #FFF; font-weight: bold;">Active Metrics</p>');
    d3.selectAll(".metric-selected").nodes().forEach((dimension) => {
      d3.select("#metric-picker-body").append("div")
        .html(dimension.innerHTML)
        .attr("class", "metric-active");
    });

    d3.select("#metric-picker-body").append("button")
      .attr("id", "metric-more-options")
      .html("Change Selection")
      .on("click", () => {
        d3.select("#metric-menu").style("visibility", "visible");
      });

    showPlaycards(companies);
  });

  showPlaycards(companies);

  function showPlaycards(accounts) {
  	let numDims = (d3.selectAll(".dimension-selected").nodes().length == 0) ? -1 : d3.selectAll(".dimension-option").nodes().length,
  	  numMetrics = (d3.selectAll(".metric-selected").nodes().length == 0) ? -1 : d3.selectAll(".metric-option").nodes().length;

  	console.log(numMetrics);

    d3.select("#playcards").html("");

    d3.select("#playcards").selectAll(".playcard")
      .data(accounts.filter((account) => {
        return (Math.random() * (numDims + numMetrics))
          < (d3.selectAll(".dimension-selected").nodes().length + d3.selectAll(".metric-selected").nodes().length);
      }))
      .enter().append("div")
        .attr("class", "playcard")
        .html((data) => {
          return '<img class="account-logo" src="images/logos/' + data + '.png">'
            + '<p class="account-name">' + data + '</p>';
        }).on("click", (data) => {
          d3.select("#company-name").html(data);
          d3.select("#company-logo").attr("src", "images/logos/" + data + ".png");
          d3.select("#left-col").style("visibility", "visible");
          d3.select("#mid-col").style("visibility", "visible");
          d3.select("#right-col").style("visibility", "visible");
        });;

    d3.select("#result-counter").html("Showing " + d3.selectAll(".playcard").nodes().length + " results");
  }

});