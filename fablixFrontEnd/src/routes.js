import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import NavigationBar from './containers/NavigationBar';
import LoginPage from './containers/LoginPage';
import ShoppingCart from './containers/ShoppingCart';
import MovieListPage from './containers/MovieListPage';
import SearchPage from './containers/SearchPage';
import BrowsePage from './containers/BrowsePage';

const routes = (
  <ConnectedRouter history={history}>
    <div>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/cart" component={ShoppingCart} />
        {/* NOTE: put other app routes here */}
        <Route exact path="/MovieList" component={MovieListPage} />
        <Route exact path="/Search" component={SearchPage} />
        <Route exact path="/Browse" component={BrowsePage} />
      </Switch>
    </div>
  </ConnectedRouter>
);
export default routes;
