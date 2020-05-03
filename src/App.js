// Let d3 do the DOM instead of react
import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import "./App.css";

const getRandomIndex = (array) => {
  return Math.floor(array.length * Math.random());
};

function App() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([
    {
      name: "United",
      value: 10,
      color: "#DA291C",
    },
    {
      name: "City",
      value: 15,
      color: "#6CABDD",
    },
    {
      name: "Arsenal",
      value: 20,
      color: "#EF0107",
    },
    {
      name: "Spurs",
      value: 25,
      color: "#132257",
    },
    {
      name: "Liverpool",
      value: 30,
      color: "#C8102E",
    },
    {
      name: "Chelsea",
      value: 35,
      color: "#034694",
    },
  ]);

  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 3,
              }
            : entry
        )
      );

      setIteration(iteration + 1);
    }
  }, 500);

  return (
    <React.Fragment>
      <h1>Premier League Eternal Standings</h1>
      <RacingBarChart data={data} />
      <button onClick={() => setStart(!start)}>
        {start ? "Stop the season" : "Start the season!"}
      </button>
      <p>Week: {iteration}</p>
    </React.Fragment>
  );
}

export default App;
