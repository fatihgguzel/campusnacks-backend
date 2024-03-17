'use strict';

const { CuisineTypes } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('Cuisines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cuisineType: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(CuisineTypes)),
        defaultValue: CuisineTypes.DEFAULT,
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
    await queryInterface.dropTable('Cuisines');
  },
};
