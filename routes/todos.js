module.exports = function routes(router) {
    "use strict";
    const todos = require('../controllers/todos');

    router
        .get('/todos', todos.list)
        .get('/todos/:id', todos.getId)
        .post('/todos', todos.createItem)
        .put('/todos/:id', todos.updateItem)
        .delete('/todos/:id', todos.removeItem);


};