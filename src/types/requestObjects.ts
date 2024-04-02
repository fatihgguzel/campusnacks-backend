import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface deleteAdminRestaurantParams {
  restaurantId: number;
}

export interface getConfigTypeFileParams {
  fileName: string;
}

export interface postCreateRestaurantBody {
  name: string;
  phone: string;
  email: string;
  imageUrl?: string;
  city: string;
  district: string;
  address: string;
  nHood: string;
  street: string;
  no: string;
}

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

export interface putAuthorizeAdminUserBody {
  role: ENUMS.AdminStates;
}

export interface putAuthorizeAdminUserParams {
  userId: number;
}

export interface putUpdateRestaurantBody {
  phone?: string;
  imageUrl?: string | null;
  hasDelivery?: boolean;
  deliveryPrice?: number | null;
  minimumPrice?: number;
  deliveryTime?: number;
  isBusy?: boolean;
  city?: string;
  district?: string;
  address?: string;
  nHood?: string;
  street?: string;
  no?: string;
  isOpen?: boolean;
}

export interface putUpdateRestaurantParams {
  restaurantId: number;
}
