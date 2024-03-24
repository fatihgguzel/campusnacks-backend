'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('UserAddresses', [
      {
        city: 'Izmir',
        district: 'Urla',
        address: 'mavis arkasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        city: 'Izmir',
        district: 'Balcova',
        address: 'lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserAddresses', null, {});
  },
};
