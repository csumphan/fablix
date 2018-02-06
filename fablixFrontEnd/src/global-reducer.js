import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './containers/App/reducer';
import userReducer from './containers/LoginPage/reducer';
import moviesReducer from './containers/MovieListPage/reducer';

const containersReducer = {
  containers: combineReducers({
    appReducer,
    userReducer,
    // NOTE: put other app reducers here
    moviesReducer,
  }),
};

const createGlobalReducer = () =>
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  });

export default createGlobalReducer;
