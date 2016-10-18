import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Main from '../containers/Main';
import Auth from '../containers/Auth';
import Todos from '../containers/Todos';
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

  return (
    <Route path="/" component={App} onChange={c}>
      <IndexRoute component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Restricted}>
        <Route path="/todos" component={Todos} onEnter={w(Todos.onEnter)} />
      </Route>
    </Route>
  );
}

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  first: PropTypes.bool
};
