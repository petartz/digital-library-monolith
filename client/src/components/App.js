import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import BooksList from "./BooksList"
import BookForm from "./BookForm"
import BookShow from "./BookShow"

import "../assets/scss/main.scss"

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/books" component={BooksList} />
        <Route exact path="/books/new" component={BookForm} />
        <Route exact path="/books/:id" component={BookShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
