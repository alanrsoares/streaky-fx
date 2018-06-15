import React from "react";
import ReactDOM from "react-dom";

import TVSearch from "./examples/TVSearch";
import ThrottledButton from "./examples/ThrottledButton";

import "./styles.css";

const App = () => (
  <div className="container mt-3">
    <h1 className="text-center">StreakyFx Demos</h1>
    <hr />
    <section className="mt-3">
      <h4>A throttled button:</h4>
      <ThrottledButton throttleTime={1000} />
    </section>
    <hr />
    <section className="mt-3">
      <h4>TV Show Search:</h4>
      <TVSearch />
    </section>
  </div>
);

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
