'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { OptionsTypes } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Options', [
      {
        optionsType: OptionsTypes.DEFAULT,
        //todo add options data
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        optionsType: OptionsTypes.DEFAULT,
        //todo add options data
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Options');
  },
};
