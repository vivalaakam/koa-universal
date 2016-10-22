/* eslint no-console: ["error", { allow: ["log"] }] */

import Koa from 'koa';
import session from 'koa-session';
import convert from 'koa-convert';
import favicon from 'koa-favicon';
import assets from 'koa-static';
import bodyParser from 'koa-bodyparser';
import routes from './routes';
import passport from './passport';

const port = process.env.PORT || 3000;
const app = new Koa();

app.keys = [process.env.SECRET_KEY];
app.use(favicon(`${__dirname}/../favicon.ico`));
app.use(assets(`${__dirname}/../assets`));

app.use(convert(session(app)));
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app
  .use(routes.routes())
  .use(routes.allowedMethods());

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
