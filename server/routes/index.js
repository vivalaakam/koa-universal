import Router from 'koa-router';
import todos from './todos';
import auth from './auth';
import webhook from './webhook';
import doings from './doings';
import prefetch from '../controllers/prefetch';
import render from '../middleware/render';

const router = new Router();
const api = new Router();

api
  .use('/auth', auth.routes(), auth.allowedMethods())
  .use('/doings', doings.routes(), doings.allowedMethods())
  .use('/todos', todos.routes(), todos.allowedMethods());

router
  .use('/webhook', webhook.routes(), webhook.allowedMethods())
  .use('/api', api.routes(), api.allowedMethods());

router
  .get('/todos', prefetch.todos, render)
  .get('/doings', prefetch.doings, render)
  .get('/*', render);


export default router;
