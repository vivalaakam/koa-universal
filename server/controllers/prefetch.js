import Todo from '../models/todo';

const todoModel = new Todo();

export default {
  todos: async function fetchTodos(ctx, next) {
    const todos = await todoModel.list();
    ctx.prefetch = {
      todos
    };
    next();
  }
};
