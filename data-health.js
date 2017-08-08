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

  let sample = {
    name: "Categories",
    children: [
      {
        name: "Firmographics",
        children: [
          {
          	name: "Website",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
          	name: "Country",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
          	name: "Company Name",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
          	name: "DUNS Number",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
          	name: "Annual Sales",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
          	name: "SIC Sales",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          }
        ]
      },
      {
        name: "Key Executive",
        children: [
          {
            name: "Contact First Name",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
            name: "Contact Last Name",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
            name: "Contact Job Title",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
            name: "Gender",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          },
          {
            name: "Personal LinkedIn Link",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) },
            ]
          }
        ]
      },
      {
        name: "Infrastructure",
        children: [
          {
            name: "No of Laser Printers",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "No of Servers",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "No of PCs",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "Major Network Brand",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "No of Colour Printers",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          }
        ]
      },
      {
        name: "IT Spend",
        children: [
          {
            name: "PC Budget",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "Printer Budget",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "IT Budget",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "Server Budget",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "Hardware Budget",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          }
        ]
      },
      {
        name: "Strategic Activity",
        children: [
          {
            name: "Buzz Score",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "Target Persona",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          },
          {
            name: "Growth Score",
            children: [
              { name: "cardinality", value: Math.floor(Math.random()*10000 + 1) },
              { name: "completeness", value: Math.floor(Math.random()*10000 + 1) },
              { name: "numRecords", value: Math.floor(Math.random()*10000 + 1) },
              { name: "uniqueness", value: Math.floor(Math.random()*10000 + 1) }
            ]
          }
        ]
      }
    ]
  };

  let svg = d3.select("#treemap"),
    width = Number.parseInt(svg.style("width").slice(0, -2)),
    height = Number.parseInt(svg.style("height").slice(0, -2))
    ratio = (width > height) ? width/height : height/width;

  let hierarchy = d3.hierarchy(sample)
    .sum((data) => { return data.value ? data.value : 0; })
    .sort(function(a, b) { return b.height - a.height || b.value - a.value; })
    .eachBefore((data) => { if (data.depth > 0 ) data.id = (data.parent.data.name + " " + data.data.name).toLowerCase().replace(/\s/g, "-"); });

  let treemap = d3.treemap()
    .size([width, height])
    .tile(d3.treemapSquarify.ratio(ratio))
    .padding(0.5);

  treemap(hierarchy);

  const groupColors = ["#168DC6", "#91AD41", "#F47521", "#E8CF89", "#E03A00", "#84DBFF"];

  let groups = svg.selectAll("g")
    .data(hierarchy.children)
    .enter().append("g")
      .attr("id", (data) => { return data.id; })
      .attr("fill", (data, index) => { return groupColors[index]; })
      .on("click", zoom);

  let rects = groups.selectAll("rect")
    .data((data) => { return data.children; })
    .enter().append("rect")
      .attr("width", (data) => { return data.x1 - data.x0; })
      .attr("height", (data) => { return data.y1 - data.y0; })
      .attr("x", (data) => { return data.x0; })
      .attr("y", (data) => { return data.y0; });

  groups.append("text")
    .html((data) => { return data.data.name; })
    .attr("x", (data) => {
      let left = d3.min(data.children.map((child) => { return child.x0; })),
        right = d3.max(data.children.map((child) => { return child.x1; }));
      return (right - left)/2 + left;
    }).attr("y", (data) => {
      let top = d3.min(data.children.map((child) => { return child.y0; })),
        bottom = d3.max(data.children.map((child) => { return child.y1; }));
      return (bottom - top)/2 + top;
    }).style("text-anchor", "middle")
    .style("fill", "#000")
    .style("font-weight", "bold");

  d3.select("#categories").on("click", () => {
    d3.selectAll(".add-on").remove();
    d3.selectAll("g").each((data, index) => {
      if (index < hierarchy.children.length) {
        d3.select("#" + data.id).transition().duration(500).delay(200).style("opacity", 1);
      } else {
        d3.select("#" + data.id).transition().duration(500).style("opacity", 0);
        setTimeout( () => { d3.select("#" + data.id).remove(); }, 500);
      }
    });
  });

  d3.select("#right-col").selectAll("div")
    .data(hierarchy.children)
    .enter().append("div")
      .attr("class", "group-detail-box")
      .html((data) => { return '<p class="group-name">' + data.data.name + '</p>'
        + '<p class="group-detail"><b>Records</b>' + data.value + '</p>'
        + '<p class="group-detail"><b>Completeness</b>' + Math.floor(Math.random()*10 + 90) + '%</p>'
        + '<p class="group-detail"><b>Uniqueness</b>' + Math.floor(Math.random()*50 + 50) + '%</p>'
        + '<p class="group-detail"><b>Cardinality</b>' + Math.floor(Math.random() * data.value) + '</p>'; })

  function zoom(data, index) {
    svg.selectAll("g")
      .transition()
      .duration(500)
      .style("opacity", 0);

    let subGroups = svg.selectAll("." + data.id + "-subgroup")
      .data(data.children)
      .enter().append("g")
        .attr("class", data.id + "-subgroup")
        .attr("id", (d) => { return d.id; })
        .attr("fill", (d) => {
          return d3.interpolate("#FFFFFF", groupColors[index])(d.value/(d3.max(data.children.map((child) => { return child.value })))); }
        );

    let subRects = subGroups.selectAll("rect")
      .data((d) => { return d.children; })
      .enter().append("rect")
        .attr("class", data.id + "-subgroup-subrect")
        .attr("id", (d) => { return d.id; })
        .attr("width", (d) => { return d.x1 - d.x0; })
        .attr("height", (d) => { return d.y1 - d.y0; })
        .attr("x", (d) => { return d.x0; })
        .attr("y", (d) => { return d.y0; });

    let groupWidth = d3.select("#" + data.id).node().getBBox().width,
      groupHeight = d3.select("#" + data.id).node().getBBox().height,
      widthScalingFactor = (Math.abs(groupWidth/groupHeight - ratio) > Math.abs(groupHeight/groupWidth - ratio) && (groupHeight/groupWidth) > 1)
        ? svg.node().getBBox().width / groupHeight
        : svg.node().getBBox().width / groupWidth,
      heightScalingFactor = (Math.abs(groupWidth/groupHeight - ratio) > Math.abs(groupHeight/groupWidth - ratio) && (groupHeight/groupWidth) > 1)
        ? svg.node().getBBox().height / groupWidth
        : svg.node().getBBox().height / groupHeight,
      leftEdge = d3.min(data.children
        .map((child) => { return child.children; })
        .reduce((arr, nextArr) => { return [...arr, ...nextArr]; })
        .map((grandChild) => { return grandChild.x0; })),
      topEdge = d3.min(data.children
        .map((child) => { return child.children; })
        .reduce((arr, nextArr) => { return [...arr, ...nextArr]; })
        .map((grandChild) => { return grandChild.y0; })),
      rightEdge = d3.max(data.children
        .map((child) => { return child.children; })
        .reduce((arr, nextArr) => { return [...arr, ...nextArr]; })
        .map((grandChild) => { return grandChild.x1; }));

    let subGroupText = subGroups.append("text")
      .html((d) => { return d.data.name; })
      .style("text-anchor", "middle")
      .style("fill", "#000")
      .style("font-weight", "bold")
      .style("opacity", 0);

    if (Math.abs(groupWidth/groupHeight - ratio) > Math.abs(groupHeight/groupWidth - ratio) && (groupHeight/groupWidth) > 1) {
      subRects.transition()
        .duration(500)
        .delay(500)
          .attr("width", (d) => { return (d.y1 - d.y0) * widthScalingFactor; })
          .attr("height", (d) => { return (d.x1 - d.x0) * heightScalingFactor; })
          .attr("x", (d) => { return (d.y0 - topEdge) * widthScalingFactor + 1; })
          .attr("y", (d) => { return (rightEdge - d.x1) * heightScalingFactor + 1; });

      subGroupText.attr("x", (d) => {
          let left = d3.min(data.children.map((child) => { return (d.y0 - topEdge) * widthScalingFactor + 1; })),
            right = d3.max(data.children.map((child) => { return ((d.y0 - topEdge) * widthScalingFactor + 1) + ((d.y1 - d.y0) * widthScalingFactor); }));
          return (right - left)/2 + left;
        }).attr("y", (d) => {
          let top = d3.min(data.children.map((child) => { return (rightEdge - d.x1) * heightScalingFactor + 1; })),
            bottom = d3.max(data.children.map((child) => { return ((rightEdge - d.x1) * heightScalingFactor + 1) + ((d.x1 - d.x0) * heightScalingFactor); }));
          return (bottom - top)/2 + top;
        });
    } else {
      subRects.transition()
        .duration(500)
        .delay(500)
          .attr("width", (d) => { return (d.x1 - d.x0) * widthScalingFactor; })
          .attr("height", (d) => { return (d.y1 - d.y0) * heightScalingFactor; })
          .attr("x", (d) => { return (d.x0 - leftEdge) * widthScalingFactor + 1; })
          .attr("y", (d) => { return (d.y0 - topEdge) * heightScalingFactor + 1; });

      subGroupText.attr("x", (d) => {
          let left = d3.min(data.children.map((child) => { return (d.x0 - leftEdge) * widthScalingFactor + 1; })),
            right = d3.max(data.children.map((child) => { return ((d.x0 - leftEdge) * widthScalingFactor + 1) + ((d.x1 - d.x0) * widthScalingFactor); }));
          return (right - left)/2 + left;
        }).attr("y", (d) => {
          let top = d3.min(data.children.map((child) => { return (d.y0 - topEdge) * heightScalingFactor + 1; })),
            bottom = d3.max(data.children.map((child) => { return ((d.y0 - topEdge) * heightScalingFactor + 1) + ((d.y1 - d.y0) * heightScalingFactor); }));
          return (bottom - top)/2 + top;
        });
    }

    subGroupText.transition()
      .duration(500)
      .delay(1000)
        .style("opacity", 1);

    d3.selectAll(".group-detail-box").remove();
    d3.select("#right-col").selectAll("div")
      .data(data.children)
      .enter().append("div")
        .attr("class", "group-detail-box")
        .html((d) => { return '<p class="group-name">' + d.data.name + '</p>'
          + '<p class="group-detail"><b>Records</b>' + d.value + '</p>'
          + '<p class="group-detail"><b>Completeness</b>' + Math.floor(Math.random()*10 + 90) + '%</p>'
          + '<p class="group-detail"><b>Uniqueness</b>' + Math.floor(Math.random()*50 + 50) + '%</p>'
          + '<p class="group-detail"><b>Cardinality</b>' + Math.floor(Math.random() * d.value) + '</p>'; })

    d3.select("#carrot-container").append("span").html("&#12297;").attr("class", "add-on").style("margin-left", "5px");
    d3.select("#carrot-container").append("span").attr("class", "add-on").html(data.data.name);
  }

});