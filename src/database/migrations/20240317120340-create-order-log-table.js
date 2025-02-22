'use strict';

const { OrderLogTypes } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('OrderLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      csComission: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      orderLogType: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(OrderLogTypes)),
      },
      orderId: {
        allowNull: false,
        references: { model: 'Orders', key: 'id' },
        type: DataTypes.INTEGER,
      },
      restaurantId: {
        allowNull: false,
        references: { model: 'Restaurants', key: 'id' },
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('OrderLogs');
  },
};
