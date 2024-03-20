import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface postForgotPasswordBody {
  email: string;
}

export interface postLoginBody {
  email: string;
  password: string;
}

export interface postRegisterBody {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  city: string;
  district: string;
  address: string;
}

export interface postResetPasswordBody {
  email: string;
  shortCode: string;
  newPassword: string;
}
