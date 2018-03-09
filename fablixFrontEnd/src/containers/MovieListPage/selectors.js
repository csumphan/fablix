export const selectMoviesContainer = (state) => state.containers.moviesReducer;

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectMoviesData = (state) => selectMoviesContainer(state).moviesData;
export const selectStarsData = (state) => selectMoviesContainer(state).starsData;
export const selectSearchMoviesError = (state) => selectMoviesContainer(state).searchMoviesError;
