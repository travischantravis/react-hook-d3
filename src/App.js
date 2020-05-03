// Let d3 do the DOM instead of react
import React, { useState } from "react";
import BarChart from "./BarChart";
import "./App.css";

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 60, 75]);

  return (
    <React.Fragment>
      <BarChart data={data} />

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
