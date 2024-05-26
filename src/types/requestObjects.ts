import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface deleteAdminRestaurantParams {
  restaurantId: number;
}

export interface getConfigTypeFileParams {
  fileName: string;
}

export interface getRestaurantContentParams {
  restaurantId: number;
}

export interface getRestaurantOrdersQuery {
  active?: boolean;
  offset: number;
  limit: number;
}

export interface getRestaurantsQuery {
  offset: number;
  limit: number;
  campus?: ENUMS.Campuses;
}

export interface itemIdParams {
  itemId: number;
}

export interface orderIdParams {
  orderId: number;
}

export interface postCreateOrderBody {
  restaurantId: number;
  items: {
    itemId: number;
    count: number;
  }[];
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
  campus?: ENUMS.Campuses;
  password: string;
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

export interface postRestaurantAddItemBody {
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  itemType: ENUMS.ItemTypes;
}

export interface putAuthorizeAdminUserBody {
  role: ENUMS.AdminStates;
}

export interface putAuthorizeAdminUserParams {
  userId: number;
}

export interface putEditItemBody {
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}

export interface putUpdateOrderBody {
  orderId: number;
  status: ENUMS.OrderStatusTypes;
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

export interface putUpdateUserbody {
  phoneNumber?: string;
  address?: string;
}
