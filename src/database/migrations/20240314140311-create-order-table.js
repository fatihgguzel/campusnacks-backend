'use strict';

const { OrderStatusTypes, DeliveryTypes } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        type: DataTypes.INTEGER,
      },
      restaurantId: {
        allowNull: false,
        references: { model: 'Restaurants', key: 'id' },
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(OrderStatusTypes)),
        allowNull: false,
      },
      orderDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deliveredDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deliveryType: {
        type: DataTypes.ENUM(...Object.values(DeliveryTypes)),
        allowNull: false,
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
    await queryInterface.dropTable('Orders');
  },
};
