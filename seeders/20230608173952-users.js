'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Nastia',
        surname: "Kosovets",
        email: "nastia@nastia.com",
        password: "1234",
        phone: 611111111,
        address: "C/ Cuba 1",
        date_of_birth: "1993-01-01",
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Judit',
        surname: "Grau",
        email: "judit@judit.com",
        password: "1234",
        phone: 622222222,
        address: "C/ Sueca 1",
        date_of_birth: "1990-01-01",
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Coral',
        surname: "Jimenez",
        email: "coral@coral.com",
        password: "1234",
        phone: 633333333,
        address: "C/ Cadiz 1",
        date_of_birth: "1992-01-01",
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Andrea',
        surname: "Suarez",
        email: "andrea@andrea.com",
        password: "1234",
        phone: 644444444,
        address: "C/ Denia 1",
        date_of_birth: "1991-01-01",
        role_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
