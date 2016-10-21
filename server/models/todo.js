import Sequelize from 'sequelize';
import Postgres from './postgres';

export default class Todo extends Postgres {
  constructor() {
    super('todos', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      text: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      user_id: {
        type: Sequelize.UUID
      }
    });
  }

  async completeAll(filter) {
    const todos = await this.list(filter);
    const promises = todos.map(todo => todo.update({ completed: true }));
    await Promise.all(promises);
    return this.list(filter);
  }

  async clearCompleted(filter) {
    const todos = await this.list({ ...filter, completed: true });
    const promises = todos.map(todo => todo.destroy());
    await Promise.all(promises);
    return this.list(filter);
  }
}
