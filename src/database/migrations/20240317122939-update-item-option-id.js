'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.changeColumn('Items', 'optionId', {
      type: DataTypes.INTEGER,
      references: { model: 'Options', key: 'id' },
      allowNull: false,
    });
  },
};
