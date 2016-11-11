import Postgres, { Sequelize, sequelize, defaults } from './postgres';
import { model as UserModel } from './user';

const model = sequelize.define('user_socials', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  user_id: {
    type: Sequelize.UUID,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },
  uid: Sequelize.STRING,
  type: Sequelize.STRING,
  avatarUrl: Sequelize.STRING,
  login: Sequelize.STRING,
  name: Sequelize.STRING,
  url: Sequelize.STRING
}, defaults);

export default class UserSocials extends Postgres {
  constructor() {
    super(model);
    this.user = UserModel;
  }

  async find(type, login) {
    const result = await this.collection.find({
      where: { type, login },
      include: [{
        model: this.user,
        as: 'user'
      }]
    });

    return result;
  }
}

export {
  model
};
