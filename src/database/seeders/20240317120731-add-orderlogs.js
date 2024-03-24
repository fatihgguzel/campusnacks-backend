'use strict';

const { OrderLogTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('OrderLogs', [
      {
        csComission: 20,
        orderId: 1,
        restaurantId: 1,
        orderLogType: OrderLogTypes.PURCHASE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('OrderLogs');
  },
};
