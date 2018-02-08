import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { searchSingleStarLoaded, searchSingleStarError } from './actions';
import { api } from '../../config';

import { SEARCH_SINGLE_STAR } from './constants';

const getSingleStar = (searchTerms) => {
  // searchTerms = {obj}

  let URL = `${api}/SearchSingleStar?`;

  const terms = Object.keys(searchTerms);

  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i];
    URL += `${term}=${searchTerms[term]}`;
    if (i !== terms.length - 1) {
      URL += '&';
    }
  }
  console.log(URL);

  return axios.get(URL);
};

const getSingleStarMovies = (searchTerms) => {
  let URL = `${api}/Search?`;

  const terms = Object.keys(searchTerms);

  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i];
    URL += `${term}=${searchTerms[term]}`;
    if (i !== terms.length - 1) {
      URL += '&';
    }
  }
  console.log(URL);

  return axios.get(URL);
};

function* searchSingleStar(action) {
  console.log('action', action);
  const result = yield call(getSingleStar, action.payload);
  const movies = yield call(getSingleStarMovies, action.payload);
  result.movies = movies.data;
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put(searchSingleStarError(result.data.error));
  } else {
    yield put(searchSingleStarLoaded(result));
  }
}

function* singleStarSagas() {
  yield takeLatest(SEARCH_SINGLE_STAR, searchSingleStar);
}

export default singleStarSagas;
