import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import { convertFromCamel } from './helpers';

class RenderShelves extends Component {
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
                  {convertFromCamel(shelf)}
                </h2>
                <div className="bookshelf-books">
                  <BookList
                    books={this.props.books[shelf]}
                    shelves={Object.keys(this.props.books)}
                    moveBook={this.props.moveBook}
                  />
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
