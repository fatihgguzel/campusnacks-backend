'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.changeColumn('Users', 'addressId', {
      type: DataTypes.INTEGER,
      references: { model: 'UserAddresses', key: 'id' },
      allowNull: false,
    });
  },
};
