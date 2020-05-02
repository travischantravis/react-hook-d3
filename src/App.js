// Let d3 do the DOM instead of react
import React, { useRef, useEffect, useState } from "react";
import { select, line, curveCardinal } from "d3";
import "./App.css";

function App() {
  const svgRef = useRef();

  const [data, setData] = useState([25, 30, 45, 60, 20]);

  // Line graph, path allows curves
  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 150 - value)
      .curve(curveCardinal);

    svg
      .selectAll("path")
      // the square brackets avoid d3 to create a path for each data
      .data([data])
      // .join() create the path element
      .join("path")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
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
