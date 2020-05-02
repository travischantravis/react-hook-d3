// Let d3 do the DOM instead of react
import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();

  const [data, setData] = useState([25, 30, 45, 60, 20]);

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
  }, [data]);

  return (
    <div className="App">
      <svg ref={svgRef}></svg>
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
