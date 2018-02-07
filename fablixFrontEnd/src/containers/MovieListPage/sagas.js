import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { searchMoviesLoaded, searchMoviesError } from './actions';
import { api } from '../../config';

import { SEARCH_MOVIES } from './constants';

const getMovieList = (searchTerms) => {
  // searchTerms = {obj}

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

function* searchMovies(action) {
  console.log('action', action);
  const result = yield call(getMovieList, action.payload);
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put(searchMoviesError(result.data.error));
  } else {
    yield put(searchMoviesLoaded(result));
  }
}

function* moviesSagas() {
  yield takeLatest(SEARCH_MOVIES, searchMovies);
}

export default moviesSagas;
