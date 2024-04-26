'use strict';

const { Campuses } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('Restaurants', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'RestaurantAddresses', key: 'id' },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hasDelivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      deliveryPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      minimumPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deliveryTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isBusy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      campus: {
        type: DataTypes.ENUM(...Object.values(Campuses)),
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
    await queryInterface.dropTable('Restaurants');
  },
};
