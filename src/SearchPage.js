import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import BookList from './BookList';

class SearchPage extends React.Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    searchResults: []
  };

  //TODO: Refactor
  updateSearchResults = query => {
    search(query).then(results => {
      //TODO: Look at using results.error to show in UI if no results found
      if (!results || results.error) {
        this.setState({ searchResults: [] });
      } else {
        results.map(book => {
          if (
            this.bookIds.currentlyReading.includes(
              book.industryIdentifiers[0].identifier
            )
          ) {
            book.shelf = 'currentlyReading';
          } else if (
            this.bookIds.wantToRead.includes(
              book.industryIdentifiers[0].identifier
            )
          ) {
            book.shelf = 'wantToRead';
          } else if (
            this.bookIds.read.includes(book.industryIdentifiers[0].identifier)
          ) {
            book.shelf = 'read';
          } else {
            book.shelf = 'none';
          }
          return book;
        });

        this.setState({ searchResults: results });
      }
    });
  };

  componentWillReceiveProps() {
    Object.keys(this.props.books).map(shelf => (
      this.bookIds[shelf] = this.props.books[shelf]
        .filter(book => book.shelf === shelf)
        .map(book => book.industryIdentifiers[0].identifier)
    ));
  }

  bookIds = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar updateSearchResults={this.updateSearchResults} />
        <div className="search-books-results">
          <BookList
            books={this.state.searchResults}
            shelves={Object.keys(this.props.books)}
            moveBook={this.props.moveBook}
          />
        </div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  static propTypes = {
    updateSearchResults: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = query => {
    this.setState({ query: query }, this.props.updateSearchResults(query));
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
