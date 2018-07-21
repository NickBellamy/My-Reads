import React from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import BookList from './BookList';

class SearchPage extends React.Component {
  state = {
    searchResults: []
  };

  updateSearchResults = query => {
    search(query).then(results => {
      this.setState({
        //TODO: Look at using results.error to show in UI if no results foundsss
        searchResults: !results || results.error ? [] : results
      });
    });
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar updateSearchResults={this.updateSearchResults} />
        <div className="search-books-results">
          <BookList
            books={this.state.searchResults}
            shelves={this.props.shelves}
            moveBook={this.props.moveBook}
          />
        </div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  state = {
    query: ''
  };

  updateQuery = query => {
    this.setState(
      { query: query },
      this.props.updateSearchResults(query)
    );
  };

  render() {
    return (
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={event => {
              this.updateQuery(event.target.value);
            }}
          />
        </div>
      </div>
    );
  }
}

export default SearchPage;
