// Let d3 do the DOM instead of react
import React, { useState } from "react";
import BrushChart from "./BrushChart";
import BrushChartChild from "./BrushChartChild";
import "./App.css";

function App() {
  const [data, setData] = useState(
    // generate an array of random values: very useful
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  );
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);
  return (
    <React.Fragment>
      <h2>Visually filtering data with d3-brush</h2>

      <BrushChart data={data}>
        {(selection) => <BrushChartChild data={data} selection={selection} />}
      </BrushChart>
      <button onClick={onAddDataClick}>Add data</button>
    </React.Fragment>
  );
}

export default App;
