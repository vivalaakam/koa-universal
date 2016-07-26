import Router from 'koa-router';
import todos from './todos';

const router = new Router();


export default function (app) {
    todos(router);
    app.use(router.routes());
    app.use(router.allowedMethods());
}
