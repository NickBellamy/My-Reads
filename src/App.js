import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import RenderShelves from './RenderShelves';
import SearchPage from './SearchPage';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    isLoading: false
  };

  componentDidMount() {
    this.setState({isLoading: true})
    
    let tempState = this.state.books;

    //Fetch book assigned to a shelf and add them to the state
    BooksAPI.getAll()
      .then(books => {
        Object.keys(this.state.books).map(
          shelf =>
            (tempState[shelf] = books.filter(book => book.shelf === shelf))
        );
      })
      .then(() => this.setState({books: tempState, isLoading: false}));
  }

  moveBook = (book, newShelf) => {
    let tempState = this.state.books;
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
    this.setState({books: tempState});

    //Update the book shelf on the back end
    BooksAPI.update(book, newShelf);
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <RenderShelves isLoading={this.state.isLoading} books={this.state.books} moveBook={this.moveBook} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage books={this.state.books} moveBook={this.moveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
