'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('doings',
      {
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
        track: Sequelize.STRING,
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      });
  },
  down: function (queryInterface) {
    queryInterface.dropTable('doings');
  }
};
