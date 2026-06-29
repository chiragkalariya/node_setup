'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('users', 'abc');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'abc', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  }
};
