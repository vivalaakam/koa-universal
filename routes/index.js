const Router = require('koa-router'),
    router = new Router()

const todos = require('./todos');
module.exports = function (app) {
    todos(router);
    app.use(router.routes());
    app.use(router.allowedMethods());
}