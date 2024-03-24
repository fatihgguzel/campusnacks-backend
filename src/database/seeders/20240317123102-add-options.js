'use strict';

const { OptionsTypes } = require('../../../dist/types/enums');
const { stringify } = require('../../../dist/helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Options', [
      {
        optionsType: OptionsTypes.DEFAULT,
        data: stringify({ data: 123 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        optionsType: OptionsTypes.DEFAULT,
        data: stringify({ data: 123 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Options');
  },
};
