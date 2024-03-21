import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface getConfigTypeFileParams {
  fileName: string;
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
