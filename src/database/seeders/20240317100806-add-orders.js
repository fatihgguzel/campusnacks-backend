'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { OrderStatusTypes, DeliveryTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Orders', [
      {
        customerId: 1,
        restaurantId: 1,
        status: OrderStatusTypes.DEFAULT,
        orderDate: new Date(),
        deliveredDate: null,
        deliveryType: DeliveryTypes.DEFAULT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Orders');
  },
};
