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

  const width = 500,
    height = 200,
    bestRCM = getBestLayout(sample, width, height),
    scalingFactor = (bestRCM.ratio > width/height) ? (width/bestRCM.fullWidth) : (height/bestRCM.fullHeight);

  var color = d3.scaleOrdinal()
    .range(["#F47521", "#168DC6", "#91AD41", "#E8CF89", "#E03A00"]);

  var grouping = d3.select(".galaxy-chart")
    .attr("width", width)
    .attr("height", height)
    .selectAll("g")
      .data(getDataWithTranslations(sample, bestRCM))
      .enter().append("g")
        .attr("transform", (data) => {
          console.log(data);
          console.log(getDimensionsAndCoordinates(data));
          return "translate(" + data.translateX * scalingFactor + ", " + data.translateY * scalingFactor + ")";
        })
        .attr("fill", (data, index) => { return color(index); });

  var connectors = grouping.selectAll("line")
    .data((data) => {
      const groupDimAndCo = getDimensionsAndCoordinates(data);
      let lineData = groupDimAndCo.childrenXYR.map((childXYR) => {
        return {
          x1: groupDimAndCo.x * scalingFactor,
          y1: groupDimAndCo.y * scalingFactor,
          x2: childXYR.x * scalingFactor,
          y2: childXYR.y * scalingFactor
        };
      });
      return lineData;
    })
    .enter().append("line")
      .attr("x1", (data) => { return data.x1; })
      .attr("y1", (data) => { return data.y1; })
      .attr("x2", (data) => { return data.x2; })
      .attr("y2", (data) => { return data.y2; })
      .style("stroke", "555")
      .style("stroke-width", "1");

  var outerCircles = grouping.selectAll("circle")
    .data((data) => { return getDimensionsAndCoordinates(data).childrenXYR; })
    .enter().append("circle")
      .attr("cx", (data) => { return data.x * scalingFactor; })
      .attr("cy", (data) => { return data.y * scalingFactor; })
      .attr("r", (data) => { return data.r * scalingFactor; });
  
  var innerCircle = grouping.append("circle")
    .attr("cx", (data) => { return getDimensionsAndCoordinates(data).x * scalingFactor; })
    .attr("cy", (data) => { return getDimensionsAndCoordinates(data).y * scalingFactor; })
    .attr("r", (data) => { return getDimensionsAndCoordinates(data).r * scalingFactor; });

  function getDataWithTranslations(allGroups, rcm) {
    let newSample = getPermutations(allGroups)[rcm.index];
    let numGroups = newSample.length;
    let xFactors = [],
      yFactors = [],
      xDet = {},
      yDet = {},
      tempX = 0,
      tempY = {};
    Object.keys(rcm.layout).forEach((key) => {
      let row = Math.floor(key/numGroups);
      let col = key%numGroups;
      if (typeof xDet[row] == 'undefined') {
        xDet[row] = 0
        tempX += rcm.layout[key][0];
      } else {
        xDet[row] = tempX;
        tempX += rcm.layout[key][0];
      }
      if (typeof yFactors[col] == 'undefined') {
        yDet[col] = 0;
        tempY[col] = rcm.layout[key][1];
      } else {
        yDet[col] = tempY[col];
        tempY[col] += rcm.layout[key][1];
      }
      xFactors.push(xDet[row]);
      yFactors.push(yDet[col]);
    });
    for (i=0; i<numGroups; i++) {
      newSample[i].translateX = xFactors[i];
      newSample[i].translateY = yFactors[i];
    }
    return newSample;
  }

  function getBestLayout(allGroups, width, height) {
    const allDims = allGroups.map((group) => {
      const groupDimAndCo = getDimensionsAndCoordinates(group);
      return [groupDimAndCo.width, groupDimAndCo.height];
    });
    const getBest = (permutationArr, ratio, keys = [], counter = 0, passedObj = {ratio: 1000, index: 0, layout: {}}) => {
      let numGroups = permutationArr[counter].length
        allWidths = Array(numGroups).fill(0),
        allHeights = Array(numGroups).fill(0),
        matrix = {};
      if (keys.length == 0) {
        for (i=0; i<numGroups; i++) {
          keys[i] = i;
        }
      }
      for (i=0; i<keys.length; i++) {
        matrix[keys[i]] = permutationArr[counter][i]
      }
      Object.keys(matrix).forEach((key) => {
        let row = Math.floor(key/numGroups);
        let col = key%numGroups;
        allWidths[row] += matrix[key][0];
        allHeights[col] += matrix[key][1];
      });
      let fullWidth = Math.max.apply(Math, allWidths),
        fullHeight = Math.max.apply(Math, allHeights)
      ratioInstance = fullWidth / fullHeight;
      nextObj = {}
      if (Math.abs(ratio - ratioInstance) < Math.abs(ratio - passedObj.ratio)) {
        nextObj.ratio = ratioInstance,
        nextObj.index = counter,
        nextObj.layout = matrix,
        nextObj.fullWidth = fullWidth,
        nextObj.fullHeight = fullHeight
      } else {
        nextObj = passedObj;
      }
      if (counter == (permutationArr.length - 1)) {
        counter = 0;
        let placementScores = keys.map((key) => {
          return ((key%numGroups) * 10) + Math.floor(key/numGroups);
        });
        let indexToSub = placementScores.indexOf( Math.max.apply(Math, placementScores) );
        if (keys[indexToSub] == (numGroups * (numGroups - 1))) {
          return nextObj;
        } else if (indexToSub == (keys.length - 1)) {
          keys[indexToSub] = (Math.floor(keys[indexToSub] / numGroups) + 1) * numGroups;
        } else {
          keys[indexToSub] = keys[keys.length - 1] + 1;
        }
        keys.sort((a, b) => { return a - b; });
        return getBest(permutationArr, ratio, keys, counter, nextObj);
      } else {
        counter++;
        return getBest(permutationArr, ratio, keys, counter, nextObj);
      }
    }

    return getBest(getPermutations(allDims), width/height);
  }

  function getPermutations(permuteArr) {
    let result = [];
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
        }
      }
    }
    permute(permuteArr);
    return result;
  }

  function getDimensionsAndCoordinates(group) {
    if (group.accounts) {
      const diameter = getGroupRadius(group) * 2;
      return {width: diameter, height: diameter};
    } else {
      let groupChildren = [];
      Object.keys(group).forEach((key) => {
        if (Array.isArray(group[key])) groupChildren = groupChildren.concat(group[key]);
      });
      let groupRadius = getGroupRadius(group);
      let angleInterval = 2 * Math.PI / groupChildren.length;
      let xBounds = [],
        yBounds = [],
        childrenXYR = [];
      groupChildren.forEach((child, index) => {
        let childRadius = getGroupRadius(child);
        let offsetMargins = getOffsetMargins((angleInterval * index) + (Math.PI/4), groupRadius, childRadius, 20);
        xBounds.push(offsetMargins.xMargin + ( Math.sign(offsetMargins.xMargin) * childRadius ));
        yBounds.push(offsetMargins.yMargin + ( Math.sign(offsetMargins.yMargin) * childRadius ));
        offsetMargins.r = childRadius;
        childrenXYR.push(offsetMargins);
      });
      const x = Math.abs(Math.min.apply(Math, xBounds));
      const y = Math.max.apply(Math, yBounds);
      let width = Math.max.apply(Math, xBounds) + x;
      let height = y - Math.min.apply(Math, yBounds);
      if (width < (groupRadius * 2)) width = groupRadius * 2;
      if (height < (groupRadius * 2)) height = groupRadius * 2;
      childrenXYR = childrenXYR.map((childXYR) => {
        return {
          x: childXYR.xMargin + x,
          y: y - childXYR.yMargin,
          r: childXYR.r
        };
      });
      return {
        width: width,
        height: height,
        x: x,
        y: y,
        r: groupRadius,
        childrenXYR: childrenXYR
      };
    }
  }

  function getOffsetMargins(angle, inner, outer, padding) {
    return {
      xMargin: Math.round( Math.cos(angle) * (inner + padding + outer) ),
      yMargin: Math.round( Math.sin(angle) * (inner + padding + outer) )
    };
  }

  function getGroupRadius(group) {
    if (!typeof(group) == 'Object') {
      console.log("You did not pass a proper group");
      return;
    }
    let groupArr = [];
    if (!Array.isArray(group)) {
      groupArr.push(group);
    } else {
      groupArr = groupArr.concat(group);
    }
    if (groupArr.every((group) => {
      let valid = true;
      Object.keys(group).forEach((key) => {
        if (Array.isArray(group[key])) valid = false;
      });
      return valid;
    })) {
      let areaArr = groupArr.map((group) => {
        return (group.accounts ** 2) * Math.PI;
      });
      return Math.round(Math.sqrt(areaArr.reduce((a, b) => { return a + b; }, 0) / Math.PI));
    } else {
      let newGroupArr = [];
      groupArr.forEach((group) => {
        let hasArray = false;
        Object.keys(group).forEach((key) => {
          if (Array.isArray(group[key])) {
            newGroupArr = newGroupArr.concat(group[key]);
            hasArray = true;
          }
        });
        if (!hasArray) newGroupArr.push(group);
      });
      return getGroupRadius(newGroupArr);
    }
  }

});