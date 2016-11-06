import Todo from '../models/todo';

const todoModel = new Todo();

export default {
  todos: async function fetchTodos(ctx, next) {
    try {
      const list = await todoModel.list();
      ctx.prefetch = {
        todos: { list }
      };
      next();
    } catch (e) {
      next();
    }
  }
};
