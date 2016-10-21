'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('todos',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        completed: Sequelize.BOOLEAN,
        text: Sequelize.STRING,
        user_id: Sequelize.UUID,
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('todos');
  }
};
