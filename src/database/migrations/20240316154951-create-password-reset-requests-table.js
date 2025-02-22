'use strict';

const { PasswordResetRequestStates } = require('../../../dist/types/enums');

module.exports = {
  up: async (queryInterface, { DataTypes, UUIDV4 }) => {
    await queryInterface.createTable('PasswordResetRequests', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
      passwordResetShortCodeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ShortCodes',
          key: 'id',
        },
        unique: true,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM(...Object.values(PasswordResetRequestStates)),
        defaultValue: PasswordResetRequestStates.PENDING,
        allowNull: false,
      },
      expireDate: {
        type: DataTypes.DATE,
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

    await queryInterface.addIndex('PasswordResetRequests', ['userId'], {
      name: 'passwordresetrequest_userid',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('PasswordResetRequests', 'passwordresetrequest_userid');

    await queryInterface.dropTable('PasswordResetRequests');
  },
};
