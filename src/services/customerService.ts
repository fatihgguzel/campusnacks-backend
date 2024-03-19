import Customer from '../database/models/Customer';
import Address from '../database/models/Address';
import bcrypt from 'bcrypt';
import { shortCodeGenerator } from '../helpers';
import ShortCode from '../database/models/ShortCode';
import * as Enums from '../types/enums';
import { v4 as uuid } from 'uuid';
import sequelize from '../database/sequelize';

interface ICreateCustomerOptions {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: Enums.CustomerRoleTypes;
  provider: Enums.CustomerProviders;
  password: string;
  city: string;
  district: string;
  address: string;
  jwtSecureCode?: string;
}
export async function createCustomer(options: ICreateCustomerOptions) {
  const customer = await sequelize.transaction(async (transaction) => {
    const verificationShortCode = await ShortCode.create(
      {
        value: await shortCodeGenerator(),
      },
      {
        transaction,
      },
    );

    const address = await Address.create(
      {
        city: options.city,
        district: options.district,
        address: options.address,
      },
      {
        transaction,
      },
    );

    const customer = await Customer.create(
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

    return customer;
  });

  return customer;
}
