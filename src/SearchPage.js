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

  updateSearchResults = query => {
    let bookIds = {};
    const bookShelves = Object.keys(this.props.books);
    const bookId = book => book.industryIdentifiers[0].identifier;

    //Populate bookIds
    //Keys are the current shelves
    //Values are the ids of books currently on that shelf
    bookShelves.map(
      shelf =>
        (bookIds[shelf] = this.props.books[shelf]
          .filter(book => book.shelf === shelf)
          .map(book => bookId(book)))
    );

    //Update state with list of books returned from query
    //Books returned reflect their currently assigned shelf
    search(query).then(results => {
      if (!results || results.error) {
        this.setState({ searchResults: [] });
      } else {
        //Map a shelf value onto each book in results
        results.map(book => {
          book.shelf = 'none'; //Default value - overwritten if match found
          //For every shelf...
          bookShelves.map(
            shelf =>
              //...if this shelf contains book's Id, set book's shelf to shelf
              bookIds[shelf].includes(bookId(book)) && (book.shelf = shelf)
          );
          return book;
        });

        this.setState({ searchResults: results });
      }
    });
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
