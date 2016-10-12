/* global document window */
/* eslint no-console: ["error", { allow: ["log"] }] */

import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import storeFactory from '../common/store';
import routes from '../common/routes/index';
import app from './app';

import '../common/style/index.less';

(async function start() {
  const mountNode = document.getElementById('app');
  const store = await storeFactory({ initialState: window.__INITIAL_STATE__ }, { routing: routerReducer });
  const history = syncHistoryWithStore(browserHistory, store);
  const myapp = app(store, history, routes);

  history.listen(location => console.log(location.pathname));
  ReactDOM.render(myapp, mountNode);
}());
