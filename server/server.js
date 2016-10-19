/* eslint no-console: ["error", { allow: ["log"] }] */

import Koa from 'koa';
import session from 'koa-session';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import webpack from 'webpack';
import { devMiddleware } from 'koa-webpack-middleware';
import routes from './routes';
import passport from './passport';
import webpackconfig from '../webpack.config';

const app = new Koa();

app.keys = ['some secret hurr'];

app.use(convert(session(app)));
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const compile = webpack(webpackconfig);

app.use(devMiddleware(compile, {
  noInfo: true,
  publicPath: webpackconfig.output.publicPath,
  headers: { 'X-Custom-Header': 'yes' },
  stats: {
    colors: true
  }
}));

app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app
  .use(routes.routes())
  .use(routes.allowedMethods());

app.listen(3000, () => {
  console.log('App listening at port 3000');
});
