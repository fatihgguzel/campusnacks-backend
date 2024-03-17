import Customer from '../database/models/Customer';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import * as CustomerService from './customerService';
import * as Helpers from '../helpers';
import bcrypt from 'bcrypt';
import * as Enums from '../types/enums';
import sequelize from '../database/sequelize';
import ShortCode from '../database/models/ShortCode';
import PasswordResetRequest from '../database/models/PasswordResetRequest';
import { shortCodeGenerator } from '../helpers';
import moment from 'moment';

interface IRegisterCustomerOptions {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: Enums.CustomerRoleTypes;
  provider: Enums.CustomerProviders;
  password: string;
  jwtSecureCode?: string;
  city: string;
  district: string;
  address: string;
}
export async function registerCustomer(options: IRegisterCustomerOptions) {
  const existingCustomer = await Customer.findOne({
    where: {
      email: options.email,
    },
  });

  if (existingCustomer) {
    throw new AppError(Errors.CUSTOMER_EXIST, 400);
  }

  const customer = await CustomerService.createCustomer({
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

  if (options.provider === Enums.CustomerProviders.CAMPUSNACKS) {
    // TODO send verification email
  }

  const authToken = Helpers.jwtGenerator({
    id: customer.id,
    jwtSecureCode: bcrypt.hashSync(customer.jwtSecureCode, bcrypt.genSaltSync(10)),
  });

  return {
    authToken,
    customer,
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

interface IForgotPasswordOptions {
  email: string;
}
export async function forgotPassword(options: IForgotPasswordOptions) {
  const customer = await Customer.findOne({ where: { email: options.email } });

  if (!customer) {
    throw new AppError(Errors.ACCOUNT_WITH_EMAIL_NOT_FOUND, 400);
  }

  await PasswordResetRequest.update(
    { state: Enums.PasswordResetRequestStates.EXPIRED },
    { where: { customerId: customer.id, state: Enums.PasswordResetRequestStates.PENDING } },
  );

  const passwordResetData = await sequelize.transaction(async (transaction) => {
    const passwordResetShortCode = await ShortCode.create(
      {
        value: await shortCodeGenerator(),
      },
      { transaction },
    );

    const passwordResetRequest = await PasswordResetRequest.create(
      {
        customerId: customer.id,
        shortCodeId: passwordResetShortCode.id,
        expireDate: moment().add(10, 'minutes'),
      },
      { transaction },
    );

    return { shortCode: passwordResetShortCode.value, expireDate: passwordResetRequest.expireDate };
  });

  return passwordResetData;
}

interface IResetPasswordOptions {
  email: string;
  shortCode: string;
  password: string;
}
export async function resetPassword(options: IResetPasswordOptions) {
  const customer = await Customer.findOne({ where: { email: options.email } });

  if (!customer) {
    throw new AppError(Errors.ACCOUNT_WITH_EMAIL_NOT_FOUND, 400);
  }

  const shortCode = await ShortCode.findOne({
    where: { value: options.shortCode },
  });

  if (!shortCode) {
    throw new AppError(Errors.INVALID_CREDENTIALS, 400);
  }

  const passwordResetRequest = await PasswordResetRequest.findOne({
    where: { shortCodeId: shortCode.id, customerId: customer.id, state: Enums.PasswordResetRequestStates.PENDING },
  });

  if (!passwordResetRequest) {
    throw new AppError(Errors.REQUEST_NOT_FOUND, 400);
  }

  if (moment(passwordResetRequest.expireDate).isBefore(moment())) {
    passwordResetRequest.state = Enums.PasswordResetRequestStates.EXPIRED;
    passwordResetRequest.save();

    throw new AppError(Errors.REQUEST_EXPIRED, 400);
  }

  customer.hashPassword = bcrypt.hashSync(options.password, bcrypt.genSaltSync(10));
  customer.save();

  passwordResetRequest.state = Enums.PasswordResetRequestStates.COMPLETED;
  passwordResetRequest.save();
}
