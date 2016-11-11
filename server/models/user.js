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
}

export {
  model
};
