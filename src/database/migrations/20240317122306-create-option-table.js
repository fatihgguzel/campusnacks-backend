'use strict';

const { OptionsTypes } = require('../../../dist/types/enums');

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('Options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      optionsType: {
        type: DataTypes.ENUM(...Object.values(OptionsTypes)),
        defaultValue: OptionsTypes.DEFAULT,
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
    await queryInterface.dropTable('Options');
  },
};
