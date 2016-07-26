import todos from '../controllers/todos';

export default function routes(router) {
    router
        .get('/todos', todos.list)
        .get('/todos/:id', todos.getId)
        .post('/todos', todos.createItem)
        .put('/todos/:id', todos.updateItem)
        .delete('/todos/:id', todos.removeItem);
}
