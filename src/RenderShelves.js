import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';

class RenderShelves extends Component {
  //Takes a string in camelCase and returns a human readable capitalised title
  //TODO: This is not currently used 
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
