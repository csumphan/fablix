import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import createGlobalReducer from './global-reducer';
import globalSagas from './global-sagas';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  sagaMiddleware,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(createGlobalReducer(), composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(globalSagas);

export default store;
