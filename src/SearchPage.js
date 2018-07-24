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
    currentSearchQuery: '',
    searchResults: []
  };

  //Update currentSearchQuery and try to update the UI with book results
  updateSearchResults = query => {
    this.setState(
      { currentSearchQuery: query },
      this.attempResultUpdate(query)
    );
  };

  //Update searchResults if no new query was set while processing request
  attempResultUpdate = query => {
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

    //Attempt to update state with list of books returned from query
    //Books returned reflect their currently assigned shelf
    search(query).then(results => {
      if (!results || results.error) {
        this.setState({ searchResults: [] });
      } else {
        //Map a shelf value onto each book in results
        results.map(book => {
          //For every shelf...
          for (let i = 0; i < bookShelves.length; i++) {
            //...if this shelf contains book's Id, set book's shelf to this shelf
            if (bookIds[bookShelves[i]].includes(bookId(book))) {
              book.shelf = bookShelves[i];
              break; //Stop searching for a match
            }
          }
          //If book is not currenty on a shelf, set shelf to "none"
          !book.shelf && (book.shelf = 'none');
          return book;
        });
        //Check to ensure query matches state's currentSearchQuery
        //If false, a new query has been entered and state shouldn't be updated
        if (this.state.currentSearchQuery === query) {
          this.setState({ searchResults: results });
        }
      }
    });
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar
          updateSearchResults={this.updateSearchResults}
          currentQuery={this.state.currentSearchQuery}
        />
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

const SearchBar = ({ updateSearchResults, currentQuery }) => (
  <div className="search-books-bar">
    <Link to="/" className="close-search">
      Close
    </Link>
    <div className="search-books-input-wrapper">
      <input
        type="text"
        placeholder="Search by title or author"
        value={currentQuery}
        onChange={event => {
          updateSearchResults(event.target.value);
        }}
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  updateSearchResults: PropTypes.func.isRequired,
  currentQuery: PropTypes.string.isRequired
};

export default SearchPage;
