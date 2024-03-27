'use strict';

module.exports = {
  up: async (queryInterface, { DataTypes }) => {
    await queryInterface.createTable('RestaurantAddresses', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nHood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no: {
        type: DataTypes.STRING,
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

    await queryInterface.addIndex('RestaurantAddresses', ['city', 'district'], {
      name: 'restaurantaddresses_city_district',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('RestaurantAddresses', 'restaurantaddresses_city_district');

    await queryInterface.dropTable('RestaurantAddresses');
  },
};
