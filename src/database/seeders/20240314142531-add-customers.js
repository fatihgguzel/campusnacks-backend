'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CustomerRoleTypes, CustomerProviders } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Customers', [
      {
        email: 'email@mail.com',
        fullName: 'loremipsum',
        addressId: 3,
        verificationShortCodeId: null,
        verificationDate: null,
        phoneNumber: 'loremipsum',
        role: CustomerRoleTypes.DEFAULT,
        provider: CustomerProviders.CAMPUSNACKS,
        hashPassword: 'hash-passwrd',
        studentshipExpiresAt: null,
        jwtSecureCode: 'secure-code',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email1@mail.com',
        fullName: 'loremipsum1',
        addressId: 4,
        verificationShortCodeId: null,
        verificationDate: null,
        phoneNumber: 'loremipsum',
        role: CustomerRoleTypes.STUDENT,
        provider: CustomerProviders.GOOGLE,
        hashPassword: 'hash-passwrd',
        studentshipExpiresAt: null,
        jwtSecureCode: 'secure-code',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Customers');
  },
};
