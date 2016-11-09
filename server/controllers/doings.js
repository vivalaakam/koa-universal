import Doing from '../models/doing';

const doingModel = new Doing();

export default {
  getId: async function getId(ctx) {
    const data = await doingModel.getId(ctx.params.id);
    ctx.body = data;
  },
  list: async function list(ctx) {
    const auth = ctx.state.user;
    const data = await doingModel.list({ user_id: auth.id }, [['created_at', 'DESC']]);
    ctx.body = data;
  },
  createItem: async function createItem(ctx) {
    const auth = ctx.state.user;
    ctx.body = await doingModel.create({ ...ctx.request.body, user_id: auth.id });
    ctx.status = 201;
  },
  updateItem: async function updateItem(ctx) {
    ctx.body = await doingModel.update(ctx.params.id, ctx.request.body);
  },
  removeItem: async function removeItem(ctx) {
    await doingModel.remove(ctx.params.id);
    ctx.body = {
      completed: true
    };
    ctx.status = 204;
  }
};
