import React from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';

class SearchPage extends React.Component {
  state = {
    searchResults: []
  };

  updateSearchResults = query => {
    search(query).then(results => {
      this.setState({
        searchResults: !results || results.error ? [] : results
      });
    });
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar updateSearchResults={this.updateSearchResults} />
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(book => (
              <li key={book.title}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${
                          book.imageLinks.smallThumbnail
                        }")`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        defaultValue={book.shelf}
                        onChange={event => {
                          this.props.moveBook(book, event.target.value);
                        }}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        {this.props.shelves.map(shelf => (
                          <option key={shelf} value={shelf}>
                            {shelf}
                          </option>
                        ))}
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
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
      { query: query.trim() },
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
          {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
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
