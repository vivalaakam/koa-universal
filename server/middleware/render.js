/* eslint no-console: ["error", { allow: ["error"] }] */
import { match } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import createSagaMiddleware from 'redux-saga';
import storeFactory from '../../common/store';
import myRoutes from '../../common/routes';
import layout from '../layout';
import app from './app';
import rootSaga from '../../common/sagas';

function route(history, store, routes) {
  return new Promise((resolve, reject) => {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.error(error);
        return reject(error);
      }

      const storeState = store.getState();
      const content = app(store, renderProps);
      return resolve({ content, storeState });
    });
  });
}

export default async function reactRender(ctx) {
  const auth = ctx.state.user;
  const sagaMiddleware = createSagaMiddleware();
  const history = createMemoryHistory(ctx.req.url);
  const store = await storeFactory({ initialState: { ...ctx.prefetch, auth }, sagaMiddleware, history });
  sagaMiddleware.run(rootSaga);
  const data = await route(history, store, myRoutes({ store, first: { time: true } }));
  ctx.status = 200;
  ctx.body = layout(data);
}
