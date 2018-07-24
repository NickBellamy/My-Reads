# MyReads Project

A simple web based React app that allows the user to manage their book collection.  Books can be moved between shelves, and there is also a search page where users can search for and add new books to any of their shelves.  This project is part of the Udacity Nanodegree program, and basic scaffolding code was provided to work from.

**The following criteria must be met:**

* The application was created with create-react-app and requires only npm install and npm start to get it installed and launched
* An updated README that describes the project and has instructions for installing and launching the project is included
* The main page shows 3 shelves for books, and each book is shown on the correct shelf
* The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly
* When the browser is refreshed, the same information is displayed on the page
* The search page has a search input field
* As the user types into the search field, books that match the query are displayed on the page
* Search results are not shown when all of the text is deleted out of the search input box
* Invalid queries are handled and prior search results are not shown
* The search works correctly when a book does not have a thumbnail or an author
* The user is able to search for multiple words, such as “artificial intelligence.”
* Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf
* If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf
* When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page
* The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search
* The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /
* Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly
* Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations
* All JSX code is formatted properly and functional

## Technologies used

React was used to build this app, using a combination of HTML, CSS, JavaScript and JSX.

## Installation

###NPM
* install all project dependencies with `npm install`
* start the development server with `npm start`

###Yarn
* install all project dependencies with `yarn install`
* start the development server with `yarn start`

##Adding and removing shelves

The code generates all the shelves from a single point in the `App.js` file.  This means that by altering the `state.books` property in the `App` class gives you the ability to extend the number of shelves past the 3 default shelves.  When adding new shelves, ensure you name them using camel casing to ensure that the new shelf name renders correctly throughout the app.

```
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      brandNewShelf: [] //New shelf added
    },
    isLoading: false
  };
```

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
