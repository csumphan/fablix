import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { loginUserLoaded, loginUserError } from './actions';
import { api } from '../../config';

import {
  LOGIN_USER,
} from './constants';

/*
  Data downloading using pure JS fetch
  @type: JS object
  { result: resultObj, error: errorObj }
*/
// const postLogin = (credential) => {
//   console.log('jsdfs', credential);
//   console.log(`${api}`);
//
//   const data = queryString.stringify({
//     email: credential.email,
//     password: credential.password
//   });
//   console.log('data',data);
//
//   return axios({
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     url: `${api}/Login`,
//     data
//   })
//     .then((res) => {
//       console.log('arrrrr');
//       console.log(res);
//       return res;
//     })
//     .catch((error) => {
//       console.log('err');
//       console.log(error);
//       return error;
//     });
// };

function* buyCart(action) {
  console.log('action', action);
  // const result = yield call(postLogin, action.credential);
  // console.log('result', result);
  // if (result.data.error) {
  //   console.log('result.data.error', result.data.error);
  //   yield put(loginUserError(result.data.error));
  // }
  // else {
  //   yield put(loginUserLoaded(result));
  // }
  yield put();
}

function* cartSagas() {
  yield takeLatest(BUY_CART, buyCart);
}

export default cartSagas;
