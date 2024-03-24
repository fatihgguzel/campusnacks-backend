'use strict';

module.exports = {
  async up(queryInterface, { DataTypes }) {
    await queryInterface.createTable('MenuProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        type: DataTypes.INTEGER,
      },
      menuId: {
        allowNull: false,
        references: { model: 'Menus', key: 'id' },
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('MenuProducts');
  },
};
