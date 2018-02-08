import {
  SEARCH_MOVIES,
  SEARCH_MOVIES_LOADED,
  SEARCH_MOVIES_ERROR,
  SORT_TITLE_ASCENDING,
  SORT_TITLE_DESCENDING,
  SORT_YEAR_ASCENDING,
  SORT_YEAR_DESCENDING,
} from './constants';

export const searchMovies = (searchTerms) => ({ type: SEARCH_MOVIES, payload: searchTerms });

export const searchMoviesLoaded = (data) => ({
  type: SEARCH_MOVIES_LOADED,
  data,
});

export const searchMoviesError = (error) => ({
  type: SEARCH_MOVIES_ERROR,
  error,
});

export const sortTitleAscending = () => ({
  type: SORT_TITLE_ASCENDING,
});

export const sortTitleDescending = () => ({
  type: SORT_TITLE_DESCENDING,
});

export const sortYearAscending = () => ({
  type: SORT_YEAR_ASCENDING,
});

export const sortYearDescending = () => ({
  type: SORT_YEAR_DESCENDING,
});