'use strict';

const { ProductTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        productType: ProductTypes.PIZZA,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productType: ProductTypes.BURGER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  },
};
