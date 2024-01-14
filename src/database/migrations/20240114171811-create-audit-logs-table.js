'use strict';

const { AuditLogTypes } = require('../../../dist/types/enums');

module.exports = {
  up: async (queryInterface, { DataTypes, UUIDV4 }) => {
    await queryInterface.createTable('AuditLogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(AuditLogTypes)),
        defaultValue: AuditLogTypes.INFO,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      function: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
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

    await queryInterface.addIndex('AuditLogs', ['type'], {
      name: 'auditlogs_type',
    });

    await queryInterface.addIndex('AuditLogs', ['service', 'function'], {
      name: 'auditlogs_service_function',
    });

    await queryInterface.addIndex('AuditLogs', ['createdAt'], {
      name: 'auditlogs_createdat',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeIndex('AuditLogs', 'auditlogs_createdat');

    await queryInterface.removeIndex('AuditLogs', 'auditlogs_service_function');

    await queryInterface.removeIndex('AuditLogs', 'auditlogs_type');

    await queryInterface.dropTable('AuditLogs');
  },
};
