import Todo from '../models/todo';
const todoModel = new Todo();

export default {
    getId: async function getId(ctx, next) {
        const data = await todoModel.getId(ctx.params.id);
        ctx.body = data;
        next();
    },
    list: async function list(ctx, next) {
        const data = await todoModel.list();
        ctx.body = data;
        next();
    },
    createItem: async function createItem(ctx, next) {
        ctx.body = await todoModel.create(ctx.request.body);
        ctx.status = 201;
        next();
    },
    updateItem: async function updateItem(ctx, next) {
        ctx.body = await todoModel.update(ctx.params.id, ctx.request.body);
        next();
    },
    removeItem: async function removeItem(ctx, next) {
        await todoModel.remove(ctx.params.id);
        ctx.status = 204;
        next();
    }
};
