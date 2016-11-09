import Postgres, { Sequelize, sequelize, defaults } from './postgres';
import { model as DoingTagModel } from './doing_tag';

const model = sequelize.define('doings', {
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
  text: Sequelize.TEXT,
  time: Sequelize.DATE,
  track: Sequelize.STRING
}, {
  ...defaults,
  underscored: true
});

DoingTagModel.belongsTo(model, { targetKey: 'id', foreignKey: 'doing_id' });

model.hasMany(DoingTagModel, {
  foreignKey: 'doing_id',
  as: 'tags',
  constraints: false,
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

export default class Doing extends Postgres {
  constructor() {
    super(model);
  }

  async getId(id) {
    const result = await this.collection.find({
      where: { id },
      include: [{
        model: DoingTagModel,
        as: 'tags'
      }]
    });

    return result;
  }

  async list(where = {}, order = [], limit = false, offset = false) {
    const query = {
      where,
      order,
      include: [{
        model: DoingTagModel,
        as: 'tags'
      }]
    };

    if (limit !== false) {
      query.limit = limit;
    }
    if (offset !== false) {
      query.offset = offset;
    }
    const result = await this.collection.findAll(query);
    return result;
  }

  async create(data) {
    const result = await this.collection.create(data, {
      include: [{
        model: DoingTagModel,
        as: 'tags',
        foreignKey: 'doing_id'
      }]
    });
    return result;
  }

  async update(id, data) {
    const row = await this.getId(id);
    await row.update(data, {
      include: [{
        model: DoingTagModel,
        as: 'tags',
        foreignKey: 'doing_id'
      }]
    });

    const tags = data.tags.map(tag => tag.text);
    const eTags = await row.getTags();
    const exists = eTags.map(tag => tag.text);

    const deletePromises = exists.filter(tag => tags.indexOf(tag) === -1).map(text => DoingTagModel.destroy({
      where: { doing_id: row.id, text }
    }));

    const createPromises = tags.filter(tag => exists.indexOf(tag) === -1).map(text => row.createTag({ text }));

    await Promise.all([].concat(deletePromises, createPromises));

    const result = await this.getId(id);

    return result;
  }
}

export {
  model
};
