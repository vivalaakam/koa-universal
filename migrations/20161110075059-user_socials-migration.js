'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('user_socials',
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
        uid: Sequelize.STRING,
        type: Sequelize.STRING,
        avatarUrl: Sequelize.STRING,
        login: Sequelize.STRING,
        name: Sequelize.STRING,
        url: Sequelize.STRING,
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('user_socials');
  }
};
