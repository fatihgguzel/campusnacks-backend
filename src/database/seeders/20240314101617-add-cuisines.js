'use strict';

const { CuisineTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Cuisines', [
      {
        cuisineType: CuisineTypes.ITALIAN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cuisineType: CuisineTypes.MEXICAN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Cuisines');
  },
};
