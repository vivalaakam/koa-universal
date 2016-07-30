import  RethinkDB, {r} from './rethinkdb';

export default class Todo extends RethinkDB {
    constructor() {
        super('todos', 'test');
    }

    async completeAll() {
        let db = await this.db();
        let result = await r.table(this.collection).filter({completed: false}).update({completed: true}).run(db);
        return result.replaced && this.list();
    }

    async clearCompleted() {
        let db = await this.db();
        let result = await r.table(this.collection).filter({completed: true}).delete().run(db);
        return result.deleted && this.list();
    }
}