import  RethinkDB, {r} from './rethinkdb';

export default class Auth extends RethinkDB {
    constructor() {
        super('users');
    }

    async login(email, password) {
        let db = await this.db();
        let result = await r.table(this.collection).filter({completed: false}).update({completed: true}).run(db);
        return result.replaced && this.list();
    }

    async getAll(username, type) {
        return this.list({[`${type}_login`]: username});
    }

}