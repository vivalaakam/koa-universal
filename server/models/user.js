import bcrypt from 'bcrypt';
import Postgres, { Sequelize, sequelize, defaults } from './postgres';
import { model as UserSocialModel } from './user_social';

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
}, {
  ...defaults,
  underscored: true
});

UserSocialModel.belongsTo(model, { targetKey: 'id', foreignKey: 'user_id' });

model.hasMany(UserSocialModel, {
  foreignKey: 'user_id',
  as: 'social',
  constraints: false,
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

export default class User extends Postgres {
  constructor() {
    super(model);
  }

  async create(data) {
    const result = await this.collection.create(data, {
      include: [{
        model: UserSocialModel,
        as: 'social',
        foreignKey: 'user_id'
      }]
    });
    return result;
  }

  async list(where = {}) {
    const result = await this.collection.findAll({
      where,
      attributes: { exclude: ['password', 'created_at', 'updated_at'] }
    });
    return result;
  }

  async getId(id) {
    const result = await this.collection.find({
      where: { id },
      attributes: { exclude: ['password', 'created_at', 'updated_at'] }
    });
    return result;
  }

  async find(where = {}) {
    const result = await this.collection.find({
      where,
      attributes: { exclude: ['password', 'created_at', 'updated_at'] }
    });
    return result;
  }

  async checkPassword(username, password) {
    const current = await this.collection.find({ username });
    if (!current) {
      throw new Error('User not found');
    }

    if (!bcrypt.compareSync(password, current.password)) {
      throw new Error('Incorrect password.');
    }
    return true;
  }
}

export {
  model
};
