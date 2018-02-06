// import { fromJS } from 'immutable';

import { LOGIN_USER, LOGIN_USER_LOADED, LOGIN_USER_ERROR } from './constants';

const initialState = {
  userData: null,
  userLoginLoading: null,
  userLoginLoaded: null,
  userLoginError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLoginLoading: true,
        userLoginError: null,
      };
    case LOGIN_USER_LOADED:
      return {
        ...state,
        userData: action.data,
        userLoginLoading: false,
        userLoginLoaded: true,
        userLoginError: null,
      };
    case LOGIN_USER_ERROR:
      console.log('aaaaa', action);
      return {
        ...state,
        userLoginLoading: false,
        userLoginLoaded: false,
        userLoginError: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
