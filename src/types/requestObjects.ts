import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface createAdminRestaurantBody {
  name: string;
  phone: string;
  email: string;
  imageUrl?: string;
  hasDelivery: boolean;
  deliveryPrice?: number;
  minimumPrice: number;
  deliveryTime: number;
  isBusy: boolean;
  city: string;
  district: string;
  address: string;
  nHood?: string;
  street: string;
  no: number;
}

export interface deleteAdminRestaurantParams {
  restaurantId: number;
}

export interface getConfigTypeFileParams {
  fileName: string;
}

export interface postBusinessHoursBody {
  restaurantId: number;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
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
