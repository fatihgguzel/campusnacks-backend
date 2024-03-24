'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('MenuProducts', [
      {
        productId: 1,
        menuId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        menuId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('MenuProducts');
  },
};
