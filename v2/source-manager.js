document.addEventListener("DOMContentLoaded", () => {

  d3.select("#side-menu")
    .style("height", document.documentElement.clientHeight - 30 + "px")

  d3.select("#menu-icon")
    .on("click", () => {
      d3.select("#side-menu")
        .style("transition", "all 1s")
        .style("left", 0)
        .style("box-shadow", "0 0 50px #000");
    });

  const currentSources = createSources(50),
    columnColors = ["#168DC6", "#91AD41", "#F47521", "#E8CF89"];

  d3.select("#list-body").selectAll("div")
    .data(currentSources)
    .enter().append("div")
      .attr("class", "table-row")
      .html((data) => { return '<div class="table-cell">' + data.name + '</div>'
        + '<div class="table-cell">' + data.dateModified + '</div>'
        + '<div class="table-cell">' + data.dataSourceType + '</div>'
        + '<div class="table-cell">' + data.size + '</div>'
        + '<div class="table-cell">' + data.numFields + '</div>'
        + '<div class="table-cell">' + data.numRecords + '</div>';
      });

  d3.selectAll(".count-value")
    .html((data, index) => { return createCountValues(currentSources)[index]; })
    .style("color", (data, index) => { return columnColors[index]; });

  d3.select("#upload-source-button")
    .on("click", () => {
      d3.select("#upload-file-overlay").style("visibility", "visible");
    });

  d3.select("#upload-file-overlay")
    .on("click", () => {
      if (d3.event.target.id == "upload-file-overlay") d3.select("#upload-file-overlay").style("visibility", "hidden");
    });

  function createCountValues(data) {
    let countValues = [50, 0, 0, 25];

    data.forEach((source) => {
      countValues[1] += source.numRecords;
      countValues[2] += source.numFields;
    });

    return countValues;
  }

  function createSources(numSources) {
    let sources = [];
    for (i=0; i<numSources; i++) {
      sources.push({
        name: "Source " + (i+1),
        dateModified: Math.floor(Math.random()*12 + 1) + "/" + Math.floor(Math.random()*30 + 1) + "/2016",
        dataSourceType: ["CSV", "WEB", "CRM", "SALES"][Math.floor(Math.random()*4)],
        size: Math.floor(Math.random()*10000 + 1) + "KB",
        numFields: Math.floor(Math.random()*100 + 1),
        numRecords: Math.floor(Math.random()*1000 + 1)
      });
    }
    return sources;
  }

});