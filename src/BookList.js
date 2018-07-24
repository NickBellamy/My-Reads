import React from 'react';
import PropTypes from 'prop-types';
import { convertFromCamel } from './helpers';

const BookList = ({ books, shelves, moveBook, isLoading }) => {
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.industryIdentifiers[0].identifier}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url("${
                    book.imageLinks ? book.imageLinks.smallThumbnail : ''
                  }")`
                }}
              />
              <div className="book-shelf-changer">
                <select
                  defaultValue={book.shelf}
                  onChange={event => {
                    moveBook(book, event.target.value);
                  }}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  {shelves.map(shelf => (
                    <option key={shelf} value={shelf}>
                      {convertFromCamel(shelf)}
                    </option>
                  ))}
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
              {book.authors ? book.authors : 'Unknown Author'}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

BookList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default BookList;
