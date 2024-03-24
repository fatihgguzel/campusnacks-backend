'use strict';

const { OrderStatusTypes, DeliveryTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1,
        restaurantId: 1,
        status: OrderStatusTypes.PENDING,
        orderDate: new Date(),
        deliveredDate: null,
        deliveryType: DeliveryTypes.PICKUP,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Orders');
  },
};
