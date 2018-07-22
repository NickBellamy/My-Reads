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

  //TODO: This makes 3 state updates - does that matter?
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      Object.keys(this.state).map(shelf =>
        this.setState({
          [shelf]: books.filter(book => book.shelf === shelf)
        })
      );
    });
  }

  moveBook = (book, newShelf) => {
    let tempState = this.state;
    //If book is already on a shelf, remove it from this shelf
    if (book.shelf !== 'none') {
      tempState[book.shelf] = tempState[book.shelf].filter(
        thisBook => thisBook.title !== book.title
      );
    }
    //Add book to new shelf if it's not 'none'
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
            <SearchPage books={this.state} moveBook={this.moveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
