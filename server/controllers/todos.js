import Todo from '../models/todo';
const todoModel = new Todo();

export default {
    getId: async function getId(ctx, next) {
        const data = await todoModel.getId(ctx.params.id);
        ctx.body = data;
    },
    list: async function list(ctx, next) {
        const data = await todoModel.list();
        ctx.body = data;
    },
    createItem: async function createItem(ctx, next) {
        ctx.body = await todoModel.create(ctx.request.body);
        ctx.status = 201;
    },
    updateItem: async function updateItem(ctx, next) {
        ctx.body = await todoModel.update(ctx.params.id, ctx.request.body);
    },
    removeItem: async function removeItem(ctx, next) {
        await todoModel.remove(ctx.params.id);
        ctx.body = {
            completed: true
        };
        ctx.status = 204;
    },
    completeAllItems: async function completeAllItems(ctx) {
        const data = await todoModel.completeAll();
        ctx.body = data;
    },
    clearCompletedItems: async function clearCompletedItems(ctx) {
        const data = await todoModel.clearCompleted();
        ctx.body = data;
    }
};
