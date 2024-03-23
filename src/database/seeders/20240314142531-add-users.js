'use strict';

const { UserRoleTypes, UserProviders } = require('../../../dist/types/enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'email@mail.com',
        fullName: 'loremipsum',
        addressId: 1,
        verificationShortCodeId: null,
        verificationDate: null,
        phoneNumber: 'loremipsum',
        role: UserRoleTypes.DEFAULT,
        provider: UserProviders.CAMPUSNACKS,
        hashPassword: 'hash-passwrd',
        studentshipExpiresAt: null,
        jwtSecureCode: 'secure-code',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'email1@mail.com',
        fullName: 'loremipsum1',
        addressId: 2,
        verificationShortCodeId: null,
        verificationDate: null,
        phoneNumber: 'loremipsum',
        role: UserRoleTypes.STUDENT,
        provider: UserProviders.GOOGLE,
        hashPassword: 'hash-passwrd',
        studentshipExpiresAt: null,
        jwtSecureCode: 'secure-code',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
