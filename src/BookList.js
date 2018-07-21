import React from 'react';

class BookList extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <li key={book.industryIdentifiers[0].identifier}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    //TODO: Add "No image available"
                    backgroundImage: `url("${book.imageLinks ? book.imageLinks.smallThumbnail : ''}")`
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
                        {shelf} {/*TODO: Make this human readable*/}
                      </option>
                    ))}
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? book.authors : 'Unknown Author'}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default BookList;
