'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('permissions', [
      {
        type: "Master",
        name: "Add Users",
        rights: "Users",
      }
    ])
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete('permissions', {
      type: "Master",
      name: "Add Users",
      rights: "Users",
    })
  }
};
