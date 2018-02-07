import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import LoginPage from './containers/LoginPage';
import ShoppingCart from './containers/ShoppingCart';
import MovieListPage from './containers/MovieListPage';

const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/cart" component={ShoppingCart} />
      {/* NOTE: put other app routes here */}
      <Route exact path="/MovieList" component={MovieListPage} />
    </Switch>
  </ConnectedRouter>
);
export default routes;
