import r from 'rethinkdb';
export {r};
export default class RethinkDB {
    constructor(collection) {
        this.collection = collection;

        this.tableCheck();
    }

    async tableCheck() {
        let exists = await this.tableExists();
        if (!exists) {
            await this.tableCreate();
        }
    }

    db() {
        if (!this._conn) {
            this._conn = r.connect({
                host: process.env.RETHINKDB_DB,
                port: process.env.RETHINKDB_PORT,
                db: process.env.RETHINKDB_NAME
            });
        }

        return this._conn;
    }

    async list(filter = {}) {
        let db = await this.db();
        let query = await r.table(this.collection).filter(filter).run(db);
        let result = await query.toArray();
        return result;
    }

    async getId(id) {
        let db = await this.db();
        let result = await r.table(this.collection).get(id).run(db);
        return JSON.stringify(result, null, 2)
    }

    async create(data) {
        let db = await this.db();
        let result = await r.table(this.collection).insert(data).run(db);
        return result.inserted && this.getId(result.generated_keys[0]);
    }

    async update(id, data) {
        let db = await this.db();
        let result = await r.table(this.collection).get(id).update(data).run(db);
        return result.replaced && this.getId(id);
    }

    async remove(id) {
        let db = await this.db();
        let result = await r.table(this.collection).get(id).delete().run(db);
        return result.deleted
    }

    async tableExists() {
        let db = await this.db();
        let query = await r.tableList().run(db);
        let result = await query.toArray();
        return result.indexOf(this.collection) > -1;
    }

    async tableCreate() {
        try {
            let db = await this.db();
            await r.tableCreate(this.collection).run(db);

            if (this.indexes) {
                this.indexes.forEach(async(index) => {
                    await r.table(this.collection).indexCreate(index).run(db);
                });
            }
        }
        catch (e) {
            console.log(e.messsage);
        }
    }
}