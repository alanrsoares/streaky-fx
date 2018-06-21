import * as React from "react";

import { compose, map, filter } from "ramda";

import * as $fx from "../../StreakyFx";

import tvService from "./TVService";
import ShowCard from "./ShowCard";

const refineSearchResults = compose(
  filter(show => show.summary && show.image),
  map(x => x.show)
);

function renderResultsHeading(searchTerm, shows) {
  const len = shows.length;

  return len
    ? `${len} show${len > 1 ? "s" : ""} found`
    : `no results for "${searchTerm}"`;
}

export default class TVSearch extends React.Component {
  state = {
    shows: [],
    searchTerm: "",
    isSearching: false
  };

  clearSearch() {
    this.setState({ isSearching: false, shows: [], searchTerm: "" });
  }

  handleSearch = compose(
    $fx.debounce(500), // 500ms debounce
    $fx.map((e: Event) => e.target.value),
    $fx.map((term: string) => term.toLowerCase().trim()), // sanitization
    $fx.map((term: string) => {
      if (!term && !this.state.isSearching) {
        this.clearSearch();
      }
      return term;
    }), // plucks the input value
    $fx.filter((term: string) => term.length >= 3) // rejects values with length 2 or less
  )(searchTerm => {
    console.log(`searching "${searchTerm}"`);

    this.setState({
      searchTerm,
      isSearching: true,
      shows: []
    });

    tvService.searchShows(searchTerm).then(xs =>
      this.setState({
        shows: refineSearchResults(xs),
        isSearching: false
      })
    );
  });

  renderSearchResults() {
    const { searchTerm, shows, isSearching } = this.state;

    if (!searchTerm || isSearching) {
      return;
    }

    return (
      <div className="result-container">
        <h1 className="h4">{renderResultsHeading(searchTerm, shows)}</h1>
        <div style={{ overflowX: "scroll" }}>
          <div className="d-inline-flex p-2">
            {shows.map(show => <ShowCard show={show} />)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <form id="search-form">
          <div className="form-group">
            <label htmlFor="length">Search TV Shows</label>
            <input
              className="form-control"
              id="search-input"
              placeholder="enter tv show"
              onInput={this.handleSearch}
            />
          </div>
        </form>
        {this.renderSearchResults()}
      </div>
    );
  }
}
