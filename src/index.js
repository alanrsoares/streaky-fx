import React from "react";
import ReactDOM from "react-dom";

import * as $fx from "./StreakyFx";

import TVSearch from "./examples/TVSearch";
import ThrottledButton from "./examples/ThrottledButton";

import "./styles.css";

class App extends React.Component {
  state = {
    clickCount: 0,
    searchResults: [],
    searchTerm: "",
    isSearching: false
  };

  handleClick = $fx.throttle(1000)(() => {
    this.setState(state => ({ clickCount: state.clickCount + 1 }));
  });

  render() {
    return (
      <div className="container mt-3">
        <div>
          <ThrottledButton />
        </div>
        <div className="mt-3">
          <TVSearch />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
