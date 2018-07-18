import React from 'react';
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import RenderShelves from './RenderShelves';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {};

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={RenderShelves} />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
