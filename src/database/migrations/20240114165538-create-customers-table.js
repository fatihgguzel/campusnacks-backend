'use strict';

const { CustomerRoleTypes, CustomerProviders } = require('../../../dist/types/enums');

module.exports = {
  up: async (queryInterface, { DataTypes, UUIDV4 }) => {
    await queryInterface.createTable('Customers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
      verificationShortCodeId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true,
      },
      verificationDate: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(...Object.values(CustomerRoleTypes)),
        defaultValue: CustomerRoleTypes.DEFAULT,
        allowNull: false,
      },
      provider: {
        type: DataTypes.ENUM(...Object.values(CustomerProviders)),
        defaultValue: CustomerProviders.CAMPUSNACKS,
        allowNull: false,
      },
      hashPassword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      studentshipExpiresAt: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
      },
      jwtSecureCode: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('Customers');
  },
};
