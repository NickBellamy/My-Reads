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
      Object.keys(this.state).map(shelf => (
        this.setState({
          [shelf]: books.filter(book => book.shelf === shelf)
        })
      ));
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
