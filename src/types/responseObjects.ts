import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface defaultResponseSchema {
  data: Record<string, never> | null;
  message: string | Errors;
  code: number;
}

export interface getRefreshTokenResponse {
  data: {
    authToken: string;
  };
  message: string | Errors;
  code: number;
}

export interface getRestaurantDetailsResponse {
  data: {
    restaurant: {
      id: number;
      name: string;
      phone: string;
      email: string;
      address: {
        id: number;
        city: string;
        district: string;
        address: string;
        nHood: string;
        street: string;
        no: string;
      };
      imageUrl: string | null;
      hasDelivery: boolean;
      deliveryPrice: number | null;
      minimumPrice: number;
      deliveryTime: number;
      isBusy: boolean;
      isOpen: boolean;
      slug: string;
      campus: ENUMS.Campuses;
    } | null;
  };
  message: string | Errors;
  code: number;
}

export interface getUserDetailsResponse {
  data: {
    user: {
      id: number;
      email: string;
      fullName: string;
      address: {
        id: number;
        city: string;
        district: string;
        address: string;
      };
      phoneNumber: string;
      role: ENUMS.UserRoleTypes;
      provider: ENUMS.UserProviders;
    } | null;
    meta: {
      studentshipExpiresAt?: Date;
    };
  };
  message: string | Errors;
  code: number;
}

export interface postLoginResponse {
  data: {
    authToken: string;
  };
  message: string | Errors;
  code: number;
}

export interface postRegisterResponse {
  data: {
    authToken: string;
  };
  message: string | Errors;
  code: number;
}
