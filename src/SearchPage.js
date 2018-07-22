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
        results.map(book => {
            if(this.allBooks.currentlyReading.includes(book.industryIdentifiers[0].identifier)) {
                book.shelf = 'currentlyReading'
            } else if (this.allBooks.wantToRead.includes(book.industryIdentifiers[0].identifier)) {
                book.shelf = 'wantToRead'
            } else if (this.allBooks.read.includes(book.industryIdentifiers[0].identifier)) {
                book.shelf = 'read'
            } else {
                book.shelf='none'
            }
            return book;
        })
      this.setState({
        //TODO: Look at using results.error to show in UI if no results foundsss
        searchResults: !results || results.error ? [] : results
      });
    });
  };

  //TODO Return books with these results, rather than from the "fetch" request
  allBooks = {
    currentlyReading: this.props.books.currentlyReading.map(
      book => book.industryIdentifiers[0].identifier
    ),
    wantToRead: this.props.books.wantToRead.map(
      book => book.industryIdentifiers[0].identifier
    ),
    read: this.props.books.read.map(
      book => book.industryIdentifiers[0].identifier
    )
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
