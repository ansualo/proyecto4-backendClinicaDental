'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointments', [
      {
        id: 1,
        user_id_1: 1,
        user_id_2: 5,
        treatment_id: 1,
        price: 25,
        date: "2023-07-01 18:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id_1: 1,
        user_id_2: 5,
        treatment_id: 3,
        price: 50,
        date: "2023-07-04 10:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id_1: 2,
        user_id_2: 6,
        treatment_id: 9,
        price: 400,
        date: "2023-07-06 16:30:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id_1: 3,
        user_id_2: 6,
        treatment_id: 7,
        price: 2500,
        date: "2023-07-10 09:30:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        user_id_1: 3,
        user_id_2: 6,
        treatment_id: 11,
        price: 150,
        date: "2023-07-12 11:30:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        user_id_1: 4,
        user_id_2: 7,
        treatment_id: 1,
        price: 25,
        date: "2023-07-05 13:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        user_id_1: 4,
        user_id_2: 7,
        treatment_id: 4,
        price: 140,
        date: "2023-07-10 17:30:00",
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
