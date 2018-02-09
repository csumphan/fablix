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
import SingleMoviePage from './containers/SingleMoviePage';
import SingleStarPage from './containers/SingleStarPage';
import Checkout from './containers/Checkout';
import HomePage from './containers/HomePage';

const routes = (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <div>
          <NavigationBar />
          <Route exact path="/Home" component={HomePage} />
          <Route exact path="/Cart" component={ShoppingCart} />
          <Route exact path="/Checkout" component={Checkout} />
          {/* NOTE: put other app routes here */}
          <Route exact path="/MovieList" component={MovieListPage} />
          <Route exact path="/Search" component={SearchPage} />
          <Route exact path="/Browse" component={BrowsePage} />
          <Route exact path="/SingleMovie" component={SingleMoviePage} />
          <Route exact path="/SingleStar" component={SingleStarPage} />
        </div>
      </Switch>
    </div>
  </ConnectedRouter>
);
export default routes;
