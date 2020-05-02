// Let d3 do the DOM instead of react
import React, { useRef, useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  axisRight,
  scaleLinear,
} from "d3";
import "./App.css";

function App() {
  // width is 300px?
  const svgRef = useRef();

  const [data, setData] = useState([25, 30, 45, 60, 20, 60, 75]);

  // Line graph, path allows curves
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    // domain 0 will be mapped to 150, while domain 75 will be mapped to 0
    const yScale = scaleLinear().domain([0, 75]).range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    const yAxis = axisRight(yScale);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    // Generate the d attribute of a path element
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      // the square brackets avoid d3 to create a path for each data
      .data([data])
      // .join() create the path element
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div className="App">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Upadte data
      </button>
      <button onClick={() => setData(data.filter((value) => value <= 5))}>
        Filter data
      </button>
    </div>
  );
}

export default App;
