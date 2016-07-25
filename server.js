const Koa = require('koa');
const routes = require('./routes');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(bodyParser());

routes(app);

app.listen(3001, function () {
    console.log('App listening at port 3001');
});