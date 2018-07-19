import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RenderShelves extends Component {
  // Takes a string in camelCase and returns a human readable capitalised title
  convertToTitle = camelCase => {
    let title = camelCase.replace(/([A-Z])/g, ' $1');
    return title[0].toUpperCase() + title.slice(1);
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(this.props.books).map(shelf => (
              <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">
                  {this.convertToTitle(shelf)}
                </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.books[shelf].map(book => (
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
                              <select>
                                <option value="move" disabled>
                                  Move to...
                                </option>
                                <option value="currentlyReading">
                                  Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
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
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default RenderShelves;
