import Router from 'koa-router';
import todos from './todos';
import auth from './auth';
import prefetch from '../controllers/prefetch';
import render from '../middleware/render';

const router = new Router();
const api = new Router();

api
  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/todos', todos.routes(), todos.allowedMethods());

router
  .use('/api', api.routes(), api.allowedMethods());

router
  .get('/todos', prefetch.todos, render)
  .get('/*', render);


export default router;
