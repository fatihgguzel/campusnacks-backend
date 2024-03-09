'use strict';

const { DayOfWeek } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('BusinessHours', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Restaurants', key: 'id' },
      },
      dayOfWeek: {
        type: DataTypes.ENUM(...Object.values(DayOfWeek)),
        defaultValue: DayOfWeek.MONDAY,
        allowNull: false,
      },
      openingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      closingTime: {
        type: DataTypes.TIME,
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
    await queryInterface.dropTable('BusinessHours');
  },
};
