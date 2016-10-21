import Sequelize from 'sequelize';

export default class Postgres {

  constructor(collection, fields) {
    this.collection = this.db().define(collection, fields, {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  }

  db() {
    if (!this.connection) {
      this.connection = new Sequelize(process.env.DATABASE_URL);
    }

    return this.connection;
  }

  async list(filter = {}) {
    const result = await this.collection.findAll({ where: filter });
    return result;
  }

  async getId(id) {
    const result = await this.collection.findById(id);
    return result;
  }

  async create(data) {
    const result = await this.collection.create(data);
    return result;
  }

  async update(id, data) {
    const row = await this.getId(id);
    const result = await row.update(data);
    return result;
  }

  async remove(id) {
    const row = await this.getId(id);
    const result = await row.destroy();
    return result;
  }
}
