'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('RestaurantAddresses', [
      {
        city: 'Izmir',
        district: 'Urla',
        address: 'mavis arkasi',
        nHood: null,
        street: 'loremipsum',
        no: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        city: 'Izmir',
        district: 'Balcova',
        address: 'lorem ipsum',
        nHood: null,
        street: 'loremipsum',
        no: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('RestaurantAddresses', null, {});
  },
};
