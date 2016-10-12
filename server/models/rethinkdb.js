/* eslint no-console: ["error", { allow: ["log"] }] */
import r from 'rethinkdb';

export { r };

export default class RethinkDB {
  constructor(collection) {
    this.collection = collection;

    this.tableCheck();
  }

  async tableCheck() {
    const exists = await this.tableExists();
    if (!exists) {
      await this.tableCreate();
    }
  }

  db() {
    if (!this.connection) {
      this.connection = r.connect({
        host: process.env.RETHINKDB_DB,
        port: process.env.RETHINKDB_PORT,
        db: process.env.RETHINKDB_NAME
      });
    }

    return this.connection;
  }

  async list(filter = {}) {
    const db = await this.db();
    const query = await r.table(this.collection).filter(filter).run(db);
    const result = await query.toArray();
    return result;
  }

  async getId(id) {
    const db = await this.db();
    const result = await r.table(this.collection).get(id).run(db);
    return result;
  }

  async create(data) {
    const db = await this.db();
    const result = await r.table(this.collection).insert(data).run(db);
    return result.inserted && this.getId(result.generated_keys[0]);
  }

  async update(id, data) {
    const db = await this.db();
    const result = await r.table(this.collection).get(id).update(data).run(db);
    return result.replaced && this.getId(id);
  }

  async remove(id) {
    const db = await this.db();
    const result = await r.table(this.collection).get(id).delete().run(db);
    return result.deleted;
  }

  async tableExists() {
    const db = await this.db();
    const query = await r.tableList().run(db);
    const result = await query.toArray();
    return result.indexOf(this.collection) > -1;
  }

  async tableCreate() {
    try {
      const db = await this.db();
      await r.tableCreate(this.collection).run(db);

      if (this.indexes) {
        this.indexes.forEach(async(index) => {
          await r.table(this.collection).indexCreate(index).run(db);
        });
      }
    } catch (e) {
      console.log(e.messsage);
    }
  }
}
