'use strict';

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const SEEDED_USERS = [
  { name: 'John Doe', email: 'john.doe@example.com', password: 'password', user_role_id: 1 },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const users = await Promise.all(
      SEEDED_USERS.map(async ({ password, ...user }) => ({
        ...user,
        password: await bcrypt.hash(password, 10),
      }))
    );

    await queryInterface.bulkInsert('users', users);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: { [Op.in]: SEEDED_USERS.map((user) => user.email) },
    }, {});
  }
};
