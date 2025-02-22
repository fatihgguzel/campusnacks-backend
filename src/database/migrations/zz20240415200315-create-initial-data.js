'use strict';

const { UserProviders, UserRoleTypes, Campuses, CuisineTypes } = require('../../../dist/types/enums');
const User = require('../../../dist/database/models/User').default;
const Restaurant = require('../../../dist/database/models/Restaurant').default;
const Cuisine = require('../../../dist/database/models/Cuisine').default;
const RestaurantAddress = require('../../../dist/database/models/RestaurantAddress').default;
const UserAddress = require('../../../dist/database/models/UserAddress').default;
const ShortCode = require('../../../dist/database/models/ShortCode').default;
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');

module.exports = {
  up: async (queryInterface, { DataTypes, UUIDV4 }) => {
    const shortCode = await ShortCode.create({
      value: '0000',
    });

    const userAddress = await UserAddress.create({
      city: 'izmir',
      district: 'urla',
      address: 'gulbahce mahallesi 12108.sokak 2/1',
    });

    const user = await User.create({
      email: 'admin@campusnacks.com',
      fullName: 'CampuSnacks Admin',
      addressId: userAddress.id,
      verificationShortCodeId: shortCode.id,
      verificationDate: new Date(),
      phoneNumber: '+905555555555',
      role: UserRoleTypes.SUPERADMIN,
      provider: UserProviders.CAMPUSNACKS,
      hashPassword: bcrypt.hashSync('B9mmrirLYtxd3ax', bcrypt.genSaltSync(10)),
      jwtSecureCode: uuid(),
    });

    const restaurantAddress = await RestaurantAddress.create({
      city: 'izmir',
      district: 'urla',
      address: 'campusnacks ev yemekleri',
      nHood: 'gulbahce',
      street: '12112',
      no: '11',
    });

    const restaurant = await Restaurant.create({
      name: 'CampuSnacks Ev Yemekleri',
      phone: '+901111111111',
      email: 'campusnacks@yemek.com',
      addressId: restaurantAddress.id,
      hasDelivery: true,
      minimumPrice: 0,
      deliveryTime: 30,
      isBusy: false,
      isOpen: true,
      slug: 'mavis-gulbahce-12112-11',
      campus: Campuses.IYTE,
      jwtSecureCode: uuid(),
      hashPassword: bcrypt.hashSync('8e8B0pfExQJhM2S', bcrypt.genSaltSync(10)),
    });

    const cuisine = await Cuisine.create({
      cuisineType: CuisineTypes.TURKISH,
    });
  },
  down: async (queryInterface) => {
    queryInterface;
  },
};
