import { fromJS } from 'immutable';

import {
  SEARCH_MOVIES,
  SEARCH_MOVIES_LOADED,
  SEARCH_MOVIES_ERROR,
  SORT_TITLE_ASCENDING,
  SORT_TITLE_DESCENDING,
  SORT_YEAR_ASCENDING,
  SORT_YEAR_DESCENDING,
} from './constants';

const initialState = fromJS({
  moviesData: null,
  searchMoviesLoading: null,
  searchMoviesLoaded: null,
  searchMoviesError: null,
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      return state.set('searchMoviesLoading', true).set('searchMoviesError', null);
    case SEARCH_MOVIES_LOADED:
      return state
        .set('moviesData', action.data)
        .set('searchMoviesLoading', false)
        .set('searchMoviesLoaded', true)
        .set('searchMoviesError', null);
    case SEARCH_MOVIES_ERROR:
      return state
        .set('searchMoviesLoading', false)
        .set('searchMoviesLoaded', false)
        .set('searchMoviesError', action.error);
    case SORT_TITLE_ASCENDING:
      console.log('sort title ascending');
      return state;

    case SORT_TITLE_DESCENDING: {
      console.log('sort title descending');
      console.log(state);
      return state;
    }

    case SORT_YEAR_ASCENDING:
      console.log('sort year ascending');
      return state;

    case SORT_YEAR_DESCENDING:
      console.log('sort year descending');
      return state;

    default:
      return state;
  }
};

export default appReducer;
