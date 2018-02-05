import { fork, all } from 'redux-saga/effects';

import appSagas from './containers/App/sagas';
import userSagas from './containers/LoginPage/sagas';

const sagas = [
  appSagas,
  userSagas,
  // NOTE: put other app sagas here
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
