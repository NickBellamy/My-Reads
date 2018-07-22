import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import RenderShelves from './RenderShelves';
import SearchPage from './SearchPage';
import './App.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      Object.keys(this.state).map(shelf =>
        this.setState({
          [shelf]: books.filter(book => book.shelf === shelf)
        })
      );
    });
  }

  //TODO: Refactor this code as it's quite messy!
  moveBook = (book, newShelf) => {
    let tempState = this.state;
    //If book is already on a shelf
    if (book.shelf !== 'none') {
      const oldShelf = book.shelf;
      const oldShelfBooks = tempState[oldShelf];
      const updatedOldShelfBooks = oldShelfBooks.filter(
        thisBook => thisBook.title !== book.title
      );
      tempState[oldShelf] = updatedOldShelfBooks;
    }
    //If shelf to move to is pre-exisiting shelf
    if (newShelf !== 'none') {
      book.shelf = newShelf;
      tempState[newShelf].push(book);
    }
    this.setState(tempState);

    BooksAPI.update(book, newShelf);
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <RenderShelves books={this.state} moveBook={this.moveBook} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              books={this.state}
              moveBook={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
