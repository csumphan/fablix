import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './containers/App/reducer';
import userReducer from './containers/LoginPage/reducer';
import moviesReducer from './containers/MovieListPage/reducer';
import shoppingCartReducer from './containers/ShoppingCart/reducer';
import singleMovieReducer from './containers/SingleMoviePage/reducer';
import singleStarReducer from './containers/SingleStarPage/reducer';

const containersReducer = {
  containers: combineReducers({
    appReducer,
    userReducer,
    // NOTE: put other app reducers here
    moviesReducer,
    shoppingCartReducer,
    singleMovieReducer,
    singleStarReducer,
  }),
};

const createGlobalReducer = () =>
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  });

export default createGlobalReducer;
