import React from "react";

import { compose } from "ramda";

import * as $fx from "../../StreakyFx";

import tvService from "./TVService";

import ShowCard from "./ShowCard";

export default class TVSearch extends React.Component {
  state = {
    searchResults: [],
    searchTerm: "",
    isSearching: false
  };

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

    if (!searchTerm || isSearching) {
      return;
    }

    return (
      <div className="result-container">
        <h1 className="h4">{heading(searchTerm, searchResults)}</h1>
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
