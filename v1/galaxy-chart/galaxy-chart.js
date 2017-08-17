document.addEventListener("DOMContentLoaded", () => {
  var sample = [];

  const numIndustries = Math.round(Math.random() * 3) + 2;
  for (let i=0; i<numIndustries; i++) {
    sample[i] = {
      name: "Industry " + (i+1),
      parents: []
    };
  }

  sample = sample.map((industry) => {
    let numParents = Math.round(Math.random() * 3) + 2;
    for (let i=0; i<numParents; i++) {
      let numChildren = Math.round(Math.random() * 3) + 2;
      let children = []
      for (j=0; j<numChildren; j++) {
        children[j] = {
          name: "Child " + (j+1),
          accounts: Math.round(Math.random() * 99) + 1
        }
      }
      industry.parents[i] = {
        name: "Parent " + (i+1),
        children: children
      };
    }
    return industry;
  });
  
  var heightTranslation = 0,
    width = 200,
    scalingFactor = width / getFullWidth(sample);

  var grouping = d3.select(".galaxy-chart")
    .attr("width", width)
    .attr("height", getFullHeight(sample) * scalingFactor)
      .selectAll("g")
      .data(sample)
      .enter().append("g")
        .attr("transform", (data) => {
        	translationStr = "translate(0, " + heightTranslation + ")";
        	heightTranslation += getHeight(data) * scalingFactor;
          return translationStr;
        });

  var subGroupBubbles = grouping.selectAll("circle")
    .data((data) => {console.log(data); return data.parents;})
    .enter().append("circle");

  var groupBubble = grouping.append("circle")
    .attr("cx", (data) => {return getWidth(data)/2 * scalingFactor;})
    .attr("cy", (data) => {return getHeight(data)/2 * scalingFactor;})
    .attr("r", (data) => {return getIndustryRadius(data) * scalingFactor;})
    .attr("fill", "#CCC")

  function adjustedX(angle, containerWidth, groupRadius, nodeRadius) {
    return (containerWidth/2) + (Math.cos(angle) * (groupRadius + 50 + nodeRadius));
  }

  function adjustedY(angle, containerHeight, groupRadius, nodeRadius) {
    return (containerHeight/2) - (Math.sin(angle) * (groupRadius + 50 + nodeRadius));
  }

  function getFullWidth(dataSet) {
    let groupWidths = dataSet.map((industry) => { return getWidth(industry); });
    return Math.max.apply(Math, groupWidths);
  }

  function getFullHeight(dataSet) {
    let height = 0;
    dataSet.forEach((industry) => {
      height += getHeight(industry);
    });
    return height;
  }

  function getWidth(nodeGroup) {
  	const groupRadius = (nodeGroup.parents) ? getIndustryRadius(nodeGroup) : getParentRadius(nodeGroup);
    const childNodes = (nodeGroup.parents) ? nodeGroup.parents : nodeGroup.children;
    const numNodes = childNodes.length;
    const angleInterval = 2 * Math.PI / numNodes;
    let outerNodeBounds = [];
    childNodes.forEach((node, index) => {
      let nodeRadius = (node.children) ? getParentRadius(node) : node.accounts;
      let angle = angleInterval * index;
      if (angle > (Math.PI/2) && angle < (Math.PI*3/2)) {
        outerNodeBounds[index] = (Math.cos(angle) * (50 + nodeRadius + groupRadius)) - nodeRadius;
      } else {
        outerNodeBounds[index] = (Math.cos(angle) * (50 + nodeRadius + groupRadius)) + nodeRadius;
      }
    });
    return Math.round(Math.max.apply(Math, outerNodeBounds) - Math.min.apply(Math, outerNodeBounds));
  }

  function getHeight(nodeGroup) {
    const groupRadius = (nodeGroup.parents) ? getIndustryRadius(nodeGroup) : getParentRadius(nodeGroup);
    const childNodes = (nodeGroup.parents) ? nodeGroup.parents : nodeGroup.children;
    const numNodes = childNodes.length;
    if (numNodes == 2) { return groupRadius*2; }
    const angleInterval = 2 * Math.PI / numNodes;
    let outerNodeBounds = [];
    childNodes.forEach((node, index) => {
      let nodeRadius = (node.children) ? getParentRadius(node) : node.accounts;
      let angle = angleInterval * index;
      if (angle > 0 && angle < Math.PI) {
        outerNodeBounds[index] = (Math.sin(angle) * (50 + nodeRadius + groupRadius)) + nodeRadius;
      } else {
        outerNodeBounds[index] = (Math.sin(angle) * (50 + nodeRadius + groupRadius)) - nodeRadius;
      }
    });
    return Math.round(Math.max.apply(Math, outerNodeBounds) - Math.min.apply(Math, outerNodeBounds));
  }

  function getIndustryRadius(industry) {
    let industryRadius = 0;
    industry.parents.forEach((parent) => {
      industryRadius += getParentRadius(parent);
    });
    return industryRadius;
  }

  function getParentRadius(parent) {
    let parentRadius = 0;
    parent.children.forEach((child) => {
      parentRadius += child.accounts;
    });
    return parentRadius;
  }
});