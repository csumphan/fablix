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

const initialState = {
  moviesData: null,
  searchMoviesLoading: null,
  searchMoviesLoaded: null,
  searchMoviesError: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {
        ...state,
        searchMoviesLoading: true,
        searchMoviesError: null,
      };
    case SEARCH_MOVIES_LOADED:
      return {
        ...state,
        moviesData: action.data,
        searchMoviesLoading: false,
        searchMoviesLoaded: true,
        searchMoviesError: null,
      };
    case SEARCH_MOVIES_ERROR:
      return {
        ...state,
        searchMoviesLoading: false,
        searchMoviesLoaded: false,
        searchMoviesError: action.error,
      };
    case SORT_TITLE_ASCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
      return { ...state, moviesData: allMovies };
    }

    case SORT_TITLE_DESCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
      return { ...state, moviesData: allMovies };
    }

    case SORT_YEAR_ASCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));
      return { ...state, moviesData: allMovies };
    }

    case SORT_YEAR_DESCENDING: {
      const allMovies = { ...state.moviesData };
      allMovies.data.sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
      return { ...state, moviesData: allMovies };
    }

    default:
      return state;
  }
};

export default appReducer;
