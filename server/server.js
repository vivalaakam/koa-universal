import Koa from 'koa';
import routes from './routes';
import bodyParser from 'koa-bodyparser';
import webpack from 'webpack'
import webpackconfig from '../webpack.config'
import { devMiddleware } from 'koa-webpack-middleware'

const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const compile = webpack(webpackconfig);

app.use(devMiddleware(compile, {
    publicPath: "/assets/"
}));

app.use(bodyParser());

routes(app);

app.listen(3000, function () {
    console.log('App listening at port 3000');
});
