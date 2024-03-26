import User from '../database/models/User';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import * as UserService from './userService';
import * as Helpers from '../helpers';
import bcrypt from 'bcrypt';
import * as Enums from '../types/enums';
import ShortCode from '../database/models/ShortCode';
import PasswordResetRequest from '../database/models/PasswordResetRequest';
import { shortCodeGenerator } from '../helpers';
import moment from 'moment';

interface IRegisterUserOptions {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: Enums.UserRoleTypes;
  provider: Enums.UserProviders;
  password: string;
  jwtSecureCode?: string;
  city: string;
  district: string;
  address: string;
}
export async function registerUser(options: IRegisterUserOptions) {
  const existingUser = await User.findOne({
    where: {
      email: options.email,
    },
  });

  if (existingUser) {
    throw new AppError(Errors.USER_EXIST, 400);
  }

  const user = await UserService.createUser({
    email: options.email,
    fullName: options.fullName,
    phoneNumber: options.phoneNumber,
    role: options.role,
    provider: options.provider,
    password: options.password,
    jwtSecureCode: options.jwtSecureCode,
    city: options.city,
    district: options.district,
    address: options.address,
  });

  if (options.provider === Enums.UserProviders.CAMPUSNACKS) {
    // TODO send verification email
  }

  const authToken = Helpers.jwtGenerator({
    id: user.id,
    jwtSecureCode: bcrypt.hashSync(user.jwtSecureCode, bcrypt.genSaltSync(10)),
  });

  return {
    authToken,
    user: user,
  };
}

interface ILoginUserOptions {
  email: string;
  password: string;
}
export async function loginUser(options: ILoginUserOptions) {
  const user = await User.findOne({
    where: {
      email: options.email,
    },
  });

  if (!user) {
    throw new AppError(Errors.INVALID_CREDENTIALS, 400);
  }

  if (user.provider !== Enums.UserProviders.CAMPUSNACKS) {
    throw new AppError(Errors.USE_GOOGLE_LOGIN, 400);
  }

  const isPasswordMatch = await bcrypt.compare(options.password, user.hashPassword!);

  if (!isPasswordMatch) {
    throw new AppError(Errors.INVALID_CREDENTIALS, 400);
  }

  const authToken = Helpers.jwtGenerator({
    id: user.id,
    jwtSecureCode: bcrypt.hashSync(user.jwtSecureCode, bcrypt.genSaltSync(10)),
  });

  return {
    authToken,
  };
}

interface IForgotPasswordOptions {
  email: string;
}
export async function forgotPassword(options: IForgotPasswordOptions) {
  const user = await User.findOne({
    where: {
      email: options.email,
    },
  });

  if (!user) {
    throw new AppError(Errors.USER_NOT_FOUND, 404);
  }

  if (user.provider !== Enums.UserProviders.CAMPUSNACKS) {
    throw new AppError(Errors.INCORRECT_PROVIDER, 400);
  }

  let passwordResetRequest: PasswordResetRequest | null = null;
  let shortCodeValue: string | null = null;

  const existingRequest = await PasswordResetRequest.findOne({
    where: {
      userId: user.id,
      state: Enums.PasswordResetRequestStates.PENDING,
    },
    include: [
      {
        model: ShortCode,
        as: 'passwordResetShortCode',
        required: true,
      },
    ],
  });

  const now = moment();

  if (existingRequest) {
    if (moment(existingRequest.expireDate).isBefore(now)) {
      await existingRequest.update({ state: Enums.PasswordResetRequestStates.EXPIRED });
    } else {
      passwordResetRequest = existingRequest;
      shortCodeValue = existingRequest.passwordResetShortCode!.value;
    }
  }

  if (!passwordResetRequest) {
    const passwordResetShortCode = await ShortCode.create({
      value: await shortCodeGenerator(),
    });

    shortCodeValue = passwordResetShortCode.value;

    passwordResetRequest = await PasswordResetRequest.create({
      userId: user.id,
      passwordResetShortCodeId: passwordResetShortCode.id,
      state: Enums.PasswordResetRequestStates.PENDING,
      expireDate: moment().add(3, 'hours'),
    });
  }

  //TODO send email to user with shortcode
  return shortCodeValue;
}

interface IResetPasswordOptions {
  email: string;
  shortCode: string;
  newPassword: string;
}
export async function resetPassword(options: IResetPasswordOptions) {
  const user = await User.findOne({
    where: {
      email: options.email,
    },
  });

  if (!user) {
    throw new AppError(Errors.USER_NOT_FOUND, 404);
  }

  const existingRequest = await PasswordResetRequest.findOne({
    where: {
      userId: user.id,
      state: Enums.PasswordResetRequestStates.PENDING,
    },
    include: [
      {
        model: ShortCode,
        as: 'passwordResetShortCode',
        where: {
          value: options.shortCode,
        },
      },
    ],
  });

  const now = moment();

  if (!existingRequest || moment(existingRequest.expireDate).isBefore(now)) {
    if (existingRequest) {
      await existingRequest!.update({ state: Enums.PasswordResetRequestStates.EXPIRED });
    }
    throw new AppError(Errors.REQUEST_NOT_FOUND_OR_EXPIRED, 404);
  }

  await user.update({ hashPassword: bcrypt.hashSync(options.newPassword, bcrypt.genSaltSync(10)) });

  await existingRequest.update({ state: Enums.PasswordResetRequestStates.COMPLETED });
}

interface IRefreshTokenOptions {
  userId: number;
  secureCode: string;
}
export function refreshToken(options: IRefreshTokenOptions) {
  const authToken = Helpers.jwtGenerator({
    id: options.userId,
    jwtSecureCode: options.secureCode,
  });

  return authToken;
}
