'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.changeColumn('Customers', 'addressId', {
      type: DataTypes.INTEGER,
      references: { model: 'Addresses', key: 'id' },
      allowNull: false,
    });
  },
};
