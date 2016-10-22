import Postgres, { Sequelize, sequelize, defaults } from './postgres';

const model = sequelize.define('users', {
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
}, defaults);

export default class Auth extends Postgres {
  constructor() {
    super(model);
  }

  async getAll(username, type) {
    return this.list({ [`${type}_login`]: username });
  }
}

export {
  model
};
