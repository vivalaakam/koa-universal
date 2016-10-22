'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        password: Sequelize.STRING,
        username: Sequelize.STRING,
        github_avatarUrl: Sequelize.STRING,
        github_login: Sequelize.STRING,
        github_name: Sequelize.STRING,
        github_url: Sequelize.STRING,
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
