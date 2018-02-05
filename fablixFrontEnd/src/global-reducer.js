import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './containers/App/reducer';
import userReducer from './containers/LoginPage/reducer';

const containersReducer = {
  containers: combineReducers({
    appReducer,
    userReducer,
    // NOTE: put other app reducers here
  }),
};

const createGlobalReducer = () => (
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  })
);

export default createGlobalReducer;
