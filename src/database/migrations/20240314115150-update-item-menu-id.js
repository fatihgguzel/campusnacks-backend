'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.changeColumn('Items', 'menuId', {
      type: DataTypes.INTEGER,
      references: { model: 'Menus', key: 'id' },
      allowNull: true,
    });
  },
};
