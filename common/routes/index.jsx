import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Main from '../containers/Main';
import Auth from '../containers/Auth';
import Todos from '../containers/Todos';
import Restricted from '../containers/Restricted';

export default function Routes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/auth" component={Auth} />
      <Route path="/" component={Restricted}>
        <Route path="/todos" component={Todos} />
      </Route>
    </Route>
  );
}
