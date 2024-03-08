import Customer from '../database/models/Customer';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import * as CustomerService from './customerService';
import * as Helpers from '../helpers';
import bcrypt from 'bcrypt';
import * as Enums from '../types/enums';

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
    throw new AppError(Errors.INVALID_CREDENTIALS);
  }

  if (customer.provider !== Enums.CustomerProviders.CAMPUSNACKS) {
    throw new AppError(Errors.USE_GOOGLE_LOGIN, 400);
  }

  const isPasswordMatch = await bcrypt.compare(options.password, customer.hashPassword!);

  if (!isPasswordMatch) {
    throw new AppError(Errors.INVALID_CREDENTIALS);
  }

  const authToken = Helpers.jwtGenerator({
    id: customer.id,
    jwtSecureCode: bcrypt.hashSync(customer.jwtSecureCode, bcrypt.genSaltSync(10)),
  });

  return { authToken };
}
