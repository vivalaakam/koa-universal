import Postgres, { Sequelize, sequelize, defaults } from './postgres';

const model = sequelize.define('doing_tags', {
  doing_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    references: {
      model: 'doings',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },
  text: {
    type: Sequelize.TEXT,
    primaryKey: true
  }
}, defaults);

export default class DoingTag extends Postgres {
  constructor() {
    super(model);
  }
}

export {
  model
};
