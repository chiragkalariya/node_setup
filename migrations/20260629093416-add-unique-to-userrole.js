'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addIndex('user_roles', ['role_name'], { unique: true });
  },

  async down (queryInterface) {
    await queryInterface.removeIndex('user_roles', ['role_name']);
  }
};
