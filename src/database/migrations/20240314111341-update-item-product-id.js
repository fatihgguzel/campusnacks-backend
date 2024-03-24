'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.changeColumn('Items', 'productId', {
      type: DataTypes.INTEGER,
      references: { model: 'Products', key: 'id' },
      allowNull: true,
    });
  },
};
