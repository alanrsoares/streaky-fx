import React from "react";
import ReactDOM from "react-dom";
import { compose } from "ramda";

import * as $fx from "./StreakyFx";
import tvService from "./TVService";

import ShowCard from "./components/ShowCard";

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

  handleSearch = compose(
    $fx.debounce(500), // 500ms debounce
    $fx.map(e => {
      const term = e.target.value;
      if (!term && !this.state.isSearching) {
        this.setState({ searchResults: [], searchTerm: "" });
      }
      return term;
    }), // pluck the input value
    $fx.filter(term => term.length >= 3) // rejects values with length 2 or less
  )(searchTerm => {
    console.log(`searching "${searchTerm}"`);

    this.setState({
      searchTerm,
      isSearching: true,
      searchResults: []
    });

    tvService.searchShows(searchTerm).then(xs =>
      this.setState({
        searchResults: xs,
        isSearching: false
      })
    );
  });

  renderSearchResults() {
    const { searchTerm, searchResults, isSearching } = this.state;

    const shows = searchResults
      .map(s => s.show)
      .filter(show => show.summary && show.image);

    function heading(searchTerm, searchResults) {
      const len = searchResults.length;

      return len
        ? `${len} show${len > 1 ? "s" : ""} found`
        : `no results for "${searchTerm}"`;
    }

    return (
      !!searchTerm &&
      !isSearching && (
        <div className="result-container">
          <h1 className="h4">{heading(searchTerm, searchResults)}</h1>
          <div style={{ overflowX: "scroll" }}>
            <div className="d-inline-flex p-2">
              {shows.map(show => <ShowCard show={show} />)}
            </div>
          </div>
        </div>
      )
    );
  }

  render() {
    return (
      <div className="container mt-3">
        <form id="search-form">
          <div className="form-group">
            <label for="length">Search TV Shows</label>
            <input
              className="form-control"
              id="search-input"
              placeholder="enter tv show"
              onInput={this.handleSearch}
            />
          </div>
        </form>
        <div>
          <button
            className="btn btn-primary btn-block"
            onClick={this.handleClick}
          >
            {this.state.clickCount
              ? `I was clicked ${this.state.clickCount} times`
              : "Hey, I'm a throttled button"}
          </button>
        </div>
        {this.renderSearchResults()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
