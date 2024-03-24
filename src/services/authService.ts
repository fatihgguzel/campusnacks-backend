import User from '../database/models/User';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import * as UserService from './userService';
import * as Helpers from '../helpers';
import bcrypt from 'bcrypt';
import * as Enums from '../types/enums';

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

interface ILoginCustomerOptions {
  email: string;
  password: string;
}
export async function loginCustomer(options: ILoginCustomerOptions) {
  const customer = await Customer.findOne({ where: { email: options.email } });

  if (!customer) {
    throw new AppError(Errors.INVALID_CREDENTIALS, 400);
  }

  if (customer.provider !== Enums.CustomerProviders.CAMPUSNACKS) {
    throw new AppError(Errors.USE_GOOGLE_LOGIN, 400);
  }

  const isPasswordMatch = await bcrypt.compare(options.password, customer.hashPassword!);

  if (!isPasswordMatch) {
    throw new AppError(Errors.INVALID_CREDENTIALS, 400);
  }

  const authToken = Helpers.jwtGenerator({
    id: customer.id,
    jwtSecureCode: bcrypt.hashSync(customer.jwtSecureCode, bcrypt.genSaltSync(10)),
  });

  return { authToken };
}
