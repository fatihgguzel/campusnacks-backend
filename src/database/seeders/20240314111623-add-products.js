'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ProductTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        productType: ProductTypes.DEFAULT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productType: ProductTypes.DEFAULT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  },
};
