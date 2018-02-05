import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import LoginPage from './containers/LoginPage';

const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      {/* NOTE: put other app routes here */}
    </Switch>
  </ConnectedRouter>
);
export default routes;
