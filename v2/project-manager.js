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

  let currentProjectList = createProjects(25);
  
  function createProjects(numProjects) {
  	let projects = [];
    for (i=0; i<numProjects; i++) {
      let type = (Math.random() > 0.5) ? "Private" : "Public",
        datasets = Math.floor(Math.random()*3) + 1,
        progress = (Math.random() > 0.3) ? 100 : Math.random()*100,
        numEnrichments = (progress == 100) ? Math.floor(Math.random()*3 + 1) : 0;
      projects.push({
        name: "Project " + (i+1),
        description: "This is a project description",
        type: type,
        datasets: datasets,
        dateCreated: Math.floor(Math.random()*12 + 1) + "/" + Math.floor(Math.random()*30 + 1) + "/2016",
        preEnrichmentHealth: Math.floor(Math.random()*49 + 1),
        postEnrichmentHealth: Math.floor(Math.random()*50 + 51),
        progress: progress,
        numEnrichments: numEnrichments
      });
    }
    return projects;
  }

  const projectListItems = d3.select("#project-list-body").selectAll("div")
    .data(currentProjectList)
    .enter().append("div")
      .attr("class", "project-list-item");

  const countValueColors = ["#168DC6", "#91AD41", "#F47521", "#E8CF89"];

  const countValues = d3.selectAll(".count-value")
    .html((data, index) => { return createCountValues(currentProjectList)[index]; })
    .style("color", (data, index) => { return countValueColors[index]; });

  projectListItems.append("p")
    .html((data) => { return data.name; })
    .attr("class", "project-name");

  projectListItems.append("p")
    .html((data) => { return data.dateCreated; })
    .attr("class", "project-last-modified");

  d3.select("#project-table-body").selectAll("tr")
    .data(currentProjectList)
    .enter().append("tr")
      .html((data) => {
      	let progressCol = (data.progress == 100) ? "Complete" : (data.progress.toFixed(1) + "%");
      	return "<td><div>" + data.name + "</div></td>"
          + "<td><div>" + data.dateCreated + "</div></td>"
          + "<td><div>" + createHealthBar(data.preEnrichmentHealth) + "</div></td>"
          + "<td><div>" + data.numEnrichments + "</div></td>"
          + "<td><div>" + createHealthBar(data.preEnrichmentHealth, data.postEnrichmentHealth) + "</div></td>"
          + "<td><div>" + progressCol + "</div></td>";
      });

  d3.selectAll(".project-list-heading").on("click", () => {
  	let target = d3.event.target;

  	d3.selectAll(".project-list-heading").attr("class", "project-list-heading");
    d3.select(target).classed("active", true);

    if (target.innerHTML == "New") {
      d3.select("#project-list-search").remove();
      d3.select("#project-list-body")
        .style("height", "calc(80vh - 78.5px")
        .style("padding", "20px")
        .style("overflow", "visible")
        .html('<p class="label-container"><label class="new-project-input-label" for="name">Name</label></p><p><input id="name" type="text"></p>'
          + '<p class="label-container"><label class="new-project-input-label" for="description">Description</label></p><p><textarea id="description" rows=4 cols=30></textarea></p>'
          + '<p class="label-container"><label class="new-project-input-label" for="type">Type</label></p><p><select id="type">'
          + '<option value="Private">Private</option>'
          + '<option value="Public">Public</option>'
          + '<option value="Shared">Shared</option>'
          + '</select></p>'
          + '<p class="label-container"><label class="new-project-input-label" for="dataset">Datasets</label></p>'
          + '<p class="checkbox-label"><input class="checkbox" type="checkbox" value="1"> Dataset 1</p>'
          + '<p class="checkbox-label"><input class="checkbox" type="checkbox" value="1"> Dataset 2</p>'
          + '<p class="checkbox-label"><input class="checkbox" type="checkbox" value="1"> Dataset 3</p>'
          + '<p class="button-container"><button id="create-project-button">Create Project</button></p>');
    }

    if (target.innerHTML == "Current") {
      d3.select("#scrollbar-positioner").remove();
      d3.select("#project-list").append("div")
        .attr("id", "project-list-search")
        .html('<input id="project-list-search-box" type="search" placeholder="&#128270; Search...">')
      d3.select("#project-list").append("div")
        .attr("id", "scrollbar-positioner")
        .html('<div id="project-list-body"></div>');

      let pli = d3.select("#project-list-body").selectAll("div")
        .data(currentProjectList)
        .enter().append("div")
          .attr("class", "project-list-item");

      pli.append("p")
        .html((data) => { return data.name; })
        .attr("class", "project-name");

      pli.append("p")
        .html((data) => { return data.dateCreated; })
        .attr("class", "project-last-modified");
    }
  });

  function createCountValues(data) {
    let countValues = [];

    countValues[0] = data.length;
    countValues[1] = data.map((project) => { return project.numEnrichments > 0; })
      .reduce((a, b) => { if (b) { return a + 1; } else { return a; } });
    countValues[2] = countValues[0] - countValues[1];
    countValues[3] = Math.floor(Math.random()*10 + 1);

    return countValues;
  }

  function createHealthBar(data) {
    let numBars = Math.round(data/5),
      barHTML = "";

    for (i=0; i<numBars; i++) {
      barHTML += '<div class="health-bar" style="background-color:#E03A00;"></div>';
    }

    return barHTML;
  }

  function createHealthBar(preEnrichment, postEnrichment) {
    let preBars = Math.round(preEnrichment/5),
      postBars = Math.round(postEnrichment/5) - preBars,
      barHTML = "";

    for (i=0; i<preBars; i++) {
      barHTML += '<div class="health-bar" style="background-color:#E03A00;"></div>';
    }
    for (i=0; i<postBars; i++) {
      barHTML += '<div class="health-bar" style="background-color:#91AD41;"></div>';
    }

    return barHTML;
  }

});