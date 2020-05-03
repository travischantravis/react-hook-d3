// Let d3 do the DOM instead of react
import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();

  const [data, setData] = useState([25, 30, 45, 60, 20, 60, 75]);

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    // domain 0 will be mapped to 150, while domain 150 will be mapped to 0
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = scaleLinear()
      .domain([50, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    const yAxis = axisRight(yScale);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index) => {
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)

          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => 150 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>

      <button onClick={() => setData(data.map((value) => value + 5))}>
        Increment data
      </button>
      <button onClick={() => setData(data.map((value) => value - 5))}>
        Decrement data
      </button>
      <button onClick={() => setData(data.filter((value) => value <= 50))}>
        Filter data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
