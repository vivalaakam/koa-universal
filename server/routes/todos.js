import Router from 'koa-router';
import todos from '../controllers/todos';
import { check } from './auth';

const router = new Router();
router
  .get('/', check, todos.list)
  .get('/:id', check, todos.getId)
  .post('/', check, todos.createItem)
  .post('/completeAll', check, todos.completeAllItems)
  .put('/:id', todos.updateItem)
  .delete('/clearCompleted', check, todos.clearCompletedItems)
  .delete('/:id', check, todos.removeItem);

export default router;
