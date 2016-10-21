import Sequelize from 'sequelize';
import Postgres from './postgres';

export default class Auth extends Postgres {
  constructor() {
    super('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  }

  async getAll(username, type) {
    return this.list({ [`${type}_login`]: username });
  }
}
