// Let d3 do the DOM instead of react
import React, { useState } from "react";
import TreeChart from "./TreeChart";
import ForceTreeChart from "./ForceTreeChart";

import "./App.css";

const initialData = {
  name: "😐",
  children: [
    {
      name: "🙂",
      children: [
        {
          name: "😀",
        },
        {
          name: "😁",
        },
        {
          name: "🤣",
        },
      ],
    },
    {
      name: "😔",
    },
  ],
};

function App() {
  const [data, setData] = useState(initialData);

  return (
    <React.Fragment>
      <h2>🪐 D3 Force Layout</h2>
      <ForceTreeChart data={data} />
      <h2>Animated Tree Chart</h2>
      <TreeChart data={data} />
    </React.Fragment>
  );
}

export default App;
