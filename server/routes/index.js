import Router from 'koa-router';
import todos from './todos';

import render from '../middleware/render'

const apiRouter = new Router({
    prefix: '/api'
});

const router = new Router();

export default function (app) {
    todos(apiRouter);
    app.use(apiRouter.routes());
    app.use(apiRouter.allowedMethods());

    router.get('/*', render)

    app.use(router.routes());
}
