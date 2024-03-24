'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Menus', [
      {
        hasBadge: true,
        badgeTag: 'tag',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hasBadge: false,
        badgeTag: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Menus');
  },
};
