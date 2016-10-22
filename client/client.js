/* global document window */
/* eslint no-console: ["error", { allow: ["log"] }] */

import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import storeFactory from '../common/store';
import routes from '../common/routes/index';
import app from './app';
import rootSaga from '../common/sagas';

import '../common/style/index.less';

(async function start() {
  const mountNode = document.getElementById('app');
  const sagaMiddleware = createSagaMiddleware();
  const store = await storeFactory({
    initialState: window.__INITIAL_STATE__,
    sagaMiddleware,
    history: browserHistory
  }, { routing: routerReducer });

  if (module.hot) {
    module.hot.accept('../common/reducers', () =>
      store.replaceReducer(require('../common/reducers'))
    );
  }

  sagaMiddleware.run(rootSaga);

  const history = syncHistoryWithStore(browserHistory, store);
  const myapp = app(store, history, routes);

  history.listen(location => console.log(location.pathname));
  ReactDOM.render(myapp, mountNode);
}());
