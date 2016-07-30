import todos from '../controllers/todos';

export default function routes(router) {
    router
        .get('/todos', todos.list)
        .get('/todos/:id', todos.getId)
        .post('/todos', todos.createItem)
        .post('/todos/completeAll', todos.completeAllItems)
        .put('/todos/:id', todos.updateItem)
        .delete('/todos/clearCompleted', todos.clearCompletedItems)
        .delete('/todos/:id', todos.removeItem);
}
