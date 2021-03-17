import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, SearchBox, Pagination, Highlight } from 'react-instantsearch-dom';
import { connectStateResults } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const searchClient = algoliasearch('LA8TI2R2AR', '1a684990198ca54cd988adf24891c58c');

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">test-algolia</a>
          </h1>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="Test">
            <div className="search-panel">
              <div className="search-panel__results">
                <SearchBox
                  className="searchbox"
                  translations={{
                    placeholder: ''
                  }}
                />
                <Results />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}

const Results = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? (
      <div>
        <Hits hitComponent={Hit} />
        <div className="pagination">
          <Pagination />
        </div>
      </div>
    ) : null
);

function Hit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="author_name" hit={props.hit} />
      </h1>
      <Highlight attribute="post_title" hit={props.hit} />
    </article>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired
};

export default App;
