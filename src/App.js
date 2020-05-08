// Let d3 do the DOM instead of react
import React, { useState } from "react";
import "./App.css";
import StackedBarChart from "./StackedBarChart";
import StackedAreaChart from "./StackedAreaChart";

const allKeys = ["🥑", "🍌", "🍆"];

const colors = {
  "🥑": "green",
  "🍌": "orange",
  "🍆": "purple",
};

const defaultData = [
  {
    year: 1980,
    "🥑": 10,
    "🍌": 20,
    "🍆": 30,
  },
  {
    year: 1990,
    "🥑": 20,
    "🍌": 40,
    "🍆": 60,
  },
  {
    year: 2000,
    "🥑": 30,
    "🍌": 45,
    "🍆": 80,
  },
  {
    year: 2010,
    "🥑": 40,
    "🍌": 60,
    "🍆": 100,
  },
  {
    year: 2020,
    "🥑": 50,
    "🍌": 80,
    "🍆": 120,
  },
];

function App() {
  const [keys, setKeys] = useState(allKeys);

  const [data, setData] = useState(defaultData);

  return (
    <React.Fragment>
      <h2>Stacked Area and Bar Chart with D3 </h2>
      <StackedAreaChart data={data} keys={keys} colors={colors} />
      <StackedBarChart data={data} keys={keys} colors={colors} />

      <div className="fields">
        {allKeys.map((key) => (
          <div key={key} className="field">
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter((_key) => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData([
            ...data,
            {
              year: Math.max(...data.map((d) => d.year)) + 10,
              "🥑": Math.round(Math.random() * 100),
              "🍌": Math.round(Math.random() * 105),
              "🍆": Math.round(Math.random() * 108),
            },
          ])
        }
      >
        Add data
      </button>
    </React.Fragment>
  );
}

export default App;
