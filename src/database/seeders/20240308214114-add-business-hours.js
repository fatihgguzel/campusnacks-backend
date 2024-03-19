'use strict';

const { DayOfWeek } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('BusinessHours', [
      {
        restaurantId: 1,
        dayOfWeek: DayOfWeek.MONDAY,
        openingTime: new Date(),
        closingTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        restaurantId: 1,
        dayOfWeek: DayOfWeek.SUNDAY,
        openingTime: new Date(),
        closingTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('BusinessHours');
  },
};
