'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointments', [
      {
        id: 1,
        user_id_1: 1,
        user_id_2: 4,
        treatment_id: 1,
        date: "2023-06-12 18:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id_1: 1,
        user_id_2: 4,
        treatment_id: 3,
        date: "2023-06-15 10:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id_1: 2,
        user_id_2: 5,
        treatment_id: 9,
        date: "2023-06-25 15:30:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        user_id_1: 3,
        user_id_2: 5,
        treatment_id: 7,
        date: "2023-06-27 09:30:00",
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
