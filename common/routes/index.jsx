import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Main from '../containers/Main';
import Todos from '../containers/Todos';
import Doings from '../containers/Doings';
import Restricted from '../containers/Restricted';

export default function Routes({ store, first }) {
  function w(loader) {
    return (nextState, replaceState, callback) => {
      if (first.time) {
        first.time = false;
        return callback();
      }
      return loader ? loader({ store, nextState, replaceState, callback }) : callback();
    };
  }

  function c(prevState, nextState, replace, callback) {
    first.time = false;
    return callback();
  }

  function getComponent(page) {
    return (nextState, cb) => {
      if (typeof require.ensure === 'function') {
        require.ensure([], (require) => {
          cb(null, require(`../containers/${page}`).default); //eslint-disable-line
        });
      } else {
        cb(null, require(`../containers/${page}`)); //eslint-disable-line
      }
    };
  }

  return (
    <Route path="/" component={App} onChange={c}>
      <IndexRoute component={Main} />
      <Route path="/auth" getComponent={getComponent('Auth')} />
      <Route path="/" component={Restricted}>
        <Route path="/todos" component={Todos} onEnter={w(Todos.onEnter)} />
        <Route path="/doings" component={Doings} onEnter={w(Doings.onEnter)} />
      </Route>
    </Route>
  );
}

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  first: PropTypes.bool
};
