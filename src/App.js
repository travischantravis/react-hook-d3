// Let d3 do the DOM instead of react
import React, { useRef, useEffect } from "react";
import { select } from "d3";
import "./App.css";

const data = [25, 30, 45, 60, 20];

function App() {
  const svgRef = useRef();

  // the empty array suggests that it will only run once
  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) => enter.append("circle"),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      )
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, []);

  return (
    <div className="App">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
