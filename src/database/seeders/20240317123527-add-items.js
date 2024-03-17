'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Items', [
      {
        restaurantId: 1,
        productId: 1,
        cuisineId: 1,
        menuId: 1,
        optionId: 1,
        hasDiscount: true,
        discount: 30,
        name: 'item-1',
        description: null,
        imageUrl: null,
        price: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        restaurantId: 1,
        productId: 1,
        cuisineId: 1,
        menuId: 1,
        optionId: 2,
        hasDiscount: false,
        discount: 20,
        name: 'item-2',
        description: 'lorem ipsum',
        imageUrl: null,
        price: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Items');
  },
};
