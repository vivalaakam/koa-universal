import Todo from '../models/todo';
import Doing from '../models/doing';


export default {
  todos: async function fetchTodos(ctx, next) {
    try {
      const model = new Todo();
      const auth = ctx.state.user;
      const list = await model.list({ user_id: auth.id });
      ctx.prefetch = {
        todos: { list }
      };
      next();
    } catch (e) {
      next();
    }
  },
  async doings(ctx, next) {
    try {
      const model = new Doing();
      const auth = ctx.state.user;
      const list = await model.list({ user_id: auth.id }, [['created_at', 'DESC']]);
      ctx.prefetch = {
        doings: { list }
      };
      next();
    } catch (e) {
      next();
    }
  }
};
