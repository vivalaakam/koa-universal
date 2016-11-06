import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import Html from './html';

export default function app(store, renderProps) {
  const component = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  return (
    `<!doctype html>
      ${renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`
  );
}
