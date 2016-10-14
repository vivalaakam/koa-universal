import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default function (store, history, routes) {
  return (
    <Provider store={store}>
      <Router history={history}>
        {routes({ store, first: { time: true } })}
      </Router>
    </Provider>
  );
}
