'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Restaurants', [
      {
        id: 1,
        name: 'Mavis',
        phone: '05050913285',
        email: 'mavis@gmail.com',
        imageUrl: null,
        hasDelivery: false,
        deliveryPrice: null,
        minimumPrice: 10,
        deliveryTime: 5,
        isBusy: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'loremipsum',
        phone: 'loremipsum',
        email: 'loremipsum@gmail.com',
        imageUrl: null,
        hasDelivery: true,
        deliveryPrice: null,
        minimumPrice: 110,
        deliveryTime: 55,
        isBusy: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  },
};
