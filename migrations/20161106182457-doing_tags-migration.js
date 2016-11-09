'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('doing_tags',
      {
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
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      });
  },
  down: function (queryInterface) {
    queryInterface.dropTable('doing_tags');
  }
};
