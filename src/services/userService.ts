import User from '../database/models/User';
import bcrypt from 'bcrypt';
import { shortCodeGenerator } from '../helpers';
import ShortCode from '../database/models/ShortCode';
import * as Enums from '../types/enums';
import { v4 as uuid } from 'uuid';
import sequelize from '../database/sequelize';
import UserAddress from '../database/models/UserAddress';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';

interface ICreateUserOptions {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: Enums.UserRoleTypes;
  provider: Enums.UserProviders;
  password: string;
  city: string;
  district: string;
  address: string;
  jwtSecureCode?: string;
}
export async function createUser(options: ICreateUserOptions) {
  const user = await sequelize.transaction(async (transaction) => {
    const verificationShortCode = await ShortCode.create(
      {
        value: await shortCodeGenerator(),
      },
      {
        transaction,
      },
    );

    const address = await UserAddress.create(
      {
        city: options.city,
        district: options.district,
        address: options.address,
      },
      {
        transaction,
      },
    );

    const user = await User.create(
      {
        email: options.email,
        fullName: options.fullName,
        addressId: address.id,
        verificationShortCodeId: verificationShortCode.id,
        phoneNumber: options.phoneNumber,
        role: options.role,
        provider: options.provider,
        hashPassword: options.password ? bcrypt.hashSync(options.password, bcrypt.genSaltSync(10)) : null,
        jwtSecureCode: options.jwtSecureCode || uuid(),
      },
      {
        transaction,
      },
    );

    return user;
  });

  return user;
}

interface IGetUserDetailsOptions {
  userId: number;
}
export async function getUserDetails(options: IGetUserDetailsOptions) {
  const user = await User.findOne({
    where: {
      id: options.userId,
    },
    attributes: ['id', 'email', 'fullName', 'phoneNumber', 'role', 'provider', 'studentshipExpiresAt'],
    include: [
      {
        model: UserAddress,
        as: 'address',
        attributes: ['id', 'city', 'district', 'address'],
      },
    ],
  });

  const meta: {
    studentshipExpiresAt?: Date;
  } = {};

  if (user?.studentshipExpiresAt) {
    meta.studentshipExpiresAt = user.studentshipExpiresAt;
  }

  return { user, meta };
}

interface IUpdateUserOptions {
  userId: number;
  phoneNumber?: string;
  address?: string;
}
export async function updateUser(options: IUpdateUserOptions) {
  const user = await User.findOne({
    where: {
      id: options.userId,
    },
  });

  if (!user) {
    throw new AppError(Errors.USER_NOT_FOUND, 404);
  }

  await sequelize.transaction(async (transaction) => {
    const userAddress = await UserAddress.findOne({
      include: [
        {
          model: User,
          as: 'user',
          where: {
            id: user.id,
          },
        },
      ],
      transaction,
    });

    if (!userAddress) {
      throw new AppError(Errors.USER_NOT_FOUND, 404);
    }

    await userAddress.update({ address: options.address }, { transaction });

    await user.update({ phoneNumber: options.phoneNumber }, { transaction });
  });
}
