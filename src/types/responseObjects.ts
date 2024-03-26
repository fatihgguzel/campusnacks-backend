import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface defaultResponseSchema {
  data: Record<string, never> | null;
  message: string | Errors;
  code: number;
}

export interface deleteAdminRestaurantResponse {
  data: Record<string, never> | null;
  message: string | Errors;
  code: number;
}

export interface postBusinessHoursResponse {
  data: Record<string, never> | null;
  message: string | Errors;
  code: number;
}

export interface postForgotPasswordResponse {
  data: Record<string, never> | null;
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

export interface postResetPasswordResponse {
  data: Record<string, never> | null;
  message: string | Errors;
  code: number;
}
