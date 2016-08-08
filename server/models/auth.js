import  RethinkDB, {r} from './rethinkdb';

export default class Todo extends RethinkDB {
    constructor() {
        super('users');
    }

    async login(email, password) {
        let db = await this.db();
        let result = await r.table(this.collection).filter({completed: false}).update({completed: true}).run(db);
        return result.replaced && this.list();
    }

    async getAll(username, type) {
        let db = await this.db();
        let query = await r.table(this.collection).filter({[`${type}_login`]: username}).run(db);
        let result = await query.toArray();
        return result;
    }

}