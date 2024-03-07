'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Addresses', [
      {
        id: 1,
        city: 'Izmir',
        district: 'Urla',
        address: 'mavis arkasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        city: 'Izmir',
        district: 'Balcova',
        address: 'lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Addresses', null, {});
  },
};
