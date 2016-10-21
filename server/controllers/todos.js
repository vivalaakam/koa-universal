import Todo from '../models/todo';

const todoModel = new Todo();

export default {
  getId: async function getId(ctx) {
    const data = await todoModel.getId(ctx.params.id);
    ctx.body = data;
  },
  list: async function list(ctx) {
    const auth = ctx.state.user;
    const data = await todoModel.list({ user_id: auth.id });
    ctx.body = data;
  },
  createItem: async function createItem(ctx) {
    const auth = ctx.state.user;
    ctx.body = await todoModel.create({ ...ctx.request.body, user_id: auth.id });
    ctx.status = 201;
  },
  updateItem: async function updateItem(ctx) {
    ctx.body = await todoModel.update(ctx.params.id, ctx.request.body);
  },
  removeItem: async function removeItem(ctx) {
    await todoModel.remove(ctx.params.id);
    ctx.body = {
      completed: true
    };
    ctx.status = 204;
  },
  completeAllItems: async function completeAllItems(ctx) {
    const auth = ctx.state.user;
    const data = await todoModel.completeAll({ user_id: auth.id });
    ctx.body = data;
  },
  clearCompletedItems: async function clearCompletedItems(ctx) {
    const auth = ctx.state.user;
    const data = await todoModel.clearCompleted({ user_id: auth.id });
    ctx.body = data;
  }
};
