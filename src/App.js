import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import RenderShelves from './RenderShelves';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        currentlyReading: books.filter(
          book => book.shelf === 'currentlyReading'
        )
      }),
        this.setState({
          wantToRead: books.filter(book => book.shelf === 'wantToRead')
        }),
        this.setState({
          read: books.filter(book => book.shelf === 'read')
        });
    });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <RenderShelves books={this.state} />}
        />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
