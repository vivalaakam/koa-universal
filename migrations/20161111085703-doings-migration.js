'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('doings', 'source_id', { type: Sequelize.STRING, before: 'created_at' })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'source_id')
  }
};
