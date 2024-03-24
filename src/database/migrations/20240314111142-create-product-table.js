'use strict';

const { ProductTypes } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productType: {
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(ProductTypes)),
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
    await queryInterface.dropTable('Products');
  },
};
