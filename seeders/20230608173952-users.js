'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const bcrypt = require('bcrypt');

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Nastia',
        surname: "Kosovets",
        email: "nastia@nastia.com",
        password: bcrypt.hashSync('Nastia123!', 8),
        phone: 611111111,
        address: "C/ Cuba 1",
        date_of_birth: "1994-01-01",
        collegiate_number: null,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Judit',
        surname: "Grau",
        email: "judit@judit.com",
        password: bcrypt.hashSync('Judit123!', 8),
        phone: 622222222,
        address: "C/ Sueca 1",
        date_of_birth: "1990-01-01",
        collegiate_number: null,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Coral',
        surname: "Jimenez",
        email: "coral@coral.com",
        password: bcrypt.hashSync('Coral123!', 8),
        phone: 633333333,
        address: "C/ Cadiz 1",
        date_of_birth: "1992-01-01",
        collegiate_number: null,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'David',
        surname: "Ochando",
        email: "david@david.com",
        password: bcrypt.hashSync('David123!', 8),
        phone: 644444444,
        address: "C/ Sevilla 1",
        date_of_birth: "1986-01-01",
        collegiate_number: 225689,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Dani',
        surname: "Tarazona",
        email: "dani@dani.com",
        password: bcrypt.hashSync('Dani123!', 8),
        phone: 655555555,
        address: "C/ Filipinas 1",
        date_of_birth: "1983-01-01",
        collegiate_number: 453278,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Andrea',
        surname: "Suarez",
        email: "andrea@andrea.com",
        password: bcrypt.hashSync('Andrea123!', 8),
        phone: 666666666,
        address: "C/ Denia 1", 
        date_of_birth: "1991-01-01",
        collegiate_number: null,
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
