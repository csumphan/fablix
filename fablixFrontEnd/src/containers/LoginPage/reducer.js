import { fromJS } from 'immutable';

import {
  LOGIN_USER,
  LOGIN_USER_LOADED,
  LOGIN_USER_ERROR,
} from './constants';

const initialState = fromJS({
  userData: null,
  userLoginLoading: null,
  userLoginLoaded: null,
  userLoginError: null,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return state
        .set('userLoginLoading', true)
        .set('userLoginError', null);
    case LOGIN_USER_LOADED:
      return state
        .set('userData', action.data)
        .set('userLoginLoading', false)
        .set('userLoginLoaded', true)
        .set('userLoginError', null);
    case LOGIN_USER_ERROR:
    console.log('aaaaa', action);
      return state
        .set('userLoginLoading', false)
        .set('userLoginLoaded', false)
        .set('userLoginError', action.error);
    default:
      return state;
  }
};

export default appReducer;
