export const selectMoviesContainer = (state) => state.containers.moviesReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectMoviesData = (state) => selectMoviesContainer(state).get('moviesData');
export const selectSearchMoviesError = (state) =>
  selectMoviesContainer(state).get('searchMoviesError');
