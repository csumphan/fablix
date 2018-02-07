import { fork, all } from 'redux-saga/effects';

import appSagas from './containers/App/sagas';
import userSagas from './containers/LoginPage/sagas';
import moviesSaga from './containers/MovieListPage/sagas';

const sagas = [
  appSagas,
  userSagas,
  // NOTE: put other app sagas here
  moviesSaga,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
