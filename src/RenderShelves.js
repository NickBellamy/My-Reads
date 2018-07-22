import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookList from './BookList';
import { convertFromCamel } from './helpers';

const RenderShelves = ({ books, moveBook }) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {Object.keys(books).map(shelf => (
          <div className="bookshelf" key={shelf}>
            <h2 className="bookshelf-title">{convertFromCamel(shelf)}</h2>
            <div className="bookshelf-books">
              <BookList
                books={books[shelf]}
                shelves={Object.keys(books)}
                moveBook={moveBook}
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

RenderShelves.propTypes = {
  books: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default RenderShelves;
