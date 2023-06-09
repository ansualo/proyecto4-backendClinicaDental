'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointments', [
      {
        id: 1,
        user_id_1: 1,
        user_id_2: 3,
        treatment_id: 2,
        date: "2023-06-13 18:30:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        user_id_1: 1,
        user_id_2: 3,
        treatment_id: 4,
        date: "2023-06-15 10:00:00",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        user_id_1: 2,
        user_id_2: 3,
        treatment_id: 9,
        date: "2023-06-25 15:30:00",
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
