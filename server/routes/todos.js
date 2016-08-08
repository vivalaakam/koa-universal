import todos from '../controllers/todos';
import Router from 'koa-router';

const router = new Router();
router
    .get('/', todos.list)
    .get('/:id', todos.getId)
    .post('/', todos.createItem)
    .post('/completeAll', todos.completeAllItems)
    .put('/:id', todos.updateItem)
    .delete('/clearCompleted', todos.clearCompletedItems)
    .delete('/:id', todos.removeItem);

export default router;
