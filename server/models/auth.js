import RethinkDB, { r } from './rethinkdb';

export default class Auth extends RethinkDB {
  constructor() {
    super('users');
  }

  async login() {
    const db = await this.db();
    const result = await r.table(this.collection).filter({ completed: false }).update({ completed: true }).run(db);
    return result.replaced && this.list();
  }

  async getAll(username, type) {
    return this.list({ [`${type}_login`]: username });
  }
}
