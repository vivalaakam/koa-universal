import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';

export default function app(store, renderProps) {
  return renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
}
