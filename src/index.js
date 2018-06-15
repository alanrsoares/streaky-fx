import React from "react";
import ReactDOM from "react-dom";

import TVSearch from "./examples/TVSearch";
import ThrottledButton from "./examples/ThrottledButton";

import "./styles.css";

function App() {
  return (
    <div className="container mt-3">
      <div>
        <ThrottledButton throttleTime={1000} />
      </div>
      <div className="mt-3">
        <TVSearch />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
