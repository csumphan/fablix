import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import queryString from 'query-string';

import { searchSingleMovieLoaded, searchSingleMovieError } from './actions';
import { api } from '../../config';

import { SEARCH_SINGLE_MOVIE } from './constants';

const getSingleMovie = (searchTerms) => {
  // searchTerms = {obj}

  let URL = `${api}/Search?`;

  console.log('assssssss');
  console.log(queryString.stringify(searchTerms));

  const data = queryString.stringify(searchTerms);

  URL += data;

  console.log(URL);

  return axios.get(URL);
};

function* searchSingleMovie(action) {
  console.log('action', action);
  const result = yield call(getSingleMovie, action.payload);
  console.log('result', result);
  if (result.data.error) {
    console.log('result.data.error', result.data.error);
    yield put(searchSingleMovieError(result.data.error));
  } else {
    yield put(searchSingleMovieLoaded(result));
  }
}

function* singleMovieSagas() {
  yield takeLatest(SEARCH_SINGLE_MOVIE, searchSingleMovie);
}

export default singleMovieSagas;
