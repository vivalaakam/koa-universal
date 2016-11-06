/* eslint no-console: ["error", { allow: ["error"] }] */
import { match } from 'react-router';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import createSagaMiddleware from 'redux-saga';
import storeFactory from '../../common/store';
import myRoutes from '../../common/routes';
import app from './app';
import rootSaga from '../../common/sagas';

function route(history, store, routes, ctx) {
  return new Promise((resolve, reject) => {
    match({ history, routes }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.error(error);
        return reject(error);
      } else if (redirectLocation) {
        ctx.status = 302;
        ctx.redirect(`${redirectLocation.pathname}${redirectLocation.search}`);
        return reject();
      }

      const content = app(store, renderProps);
      return resolve(content);
    });
  });
}

export default async function reactRender(ctx) {
  if (process.env.NODE_ENV === 'development') {
    webpackIsomorphicTools.refresh();
  }
  const auth = ctx.state.user;
  const sagaMiddleware = createSagaMiddleware();
  const history = createMemoryHistory(ctx.req.url);
  const store = await storeFactory({ initialState: { ...ctx.prefetch, auth }, sagaMiddleware, history });
  sagaMiddleware.run(rootSaga);
  const markup = await route(history, store, myRoutes({ store, first: { time: true } }), ctx);
  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = markup;
}
