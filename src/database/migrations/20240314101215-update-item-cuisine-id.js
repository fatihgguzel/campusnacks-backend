'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.changeColumn('Items', 'cuisineId', {
      type: DataTypes.INTEGER,
      references: { model: 'Cuisines', key: 'id' },
      allowNull: false,
    });
  },
};
