import * as ENUMS from './enums';
import { Errors } from './Errors';

export interface defaultResponseSchema {
  data: Record<string, never> | null;
  message: string | Errors;
  code: number;
}

export interface getOrderDetailsResponse {
  data: {
    order?: {
      id: number;
      user: {
        id: number;
        fullName: string;
        address: {
          id: number;
          city: string;
          district: string;
          address: string;
        };
        phoneNumber: string;
      };
      orderItems: {
        id: number;
        count: number;
        item: {
          id: number;
          name: string;
          price: number;
        };
      }[];
    };
  };
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

export interface getRestaurantContentResponse {
  data: {
    restaurantInfo: {
      id: number;
      name: string;
      isOpen: boolean;
      hasDelivery: boolean;
      minimumPrice: number;
      imageUrl: string | null;
      deliveryPrice: number | null;
    };
    items: {
      id: number;
      restaurantId: number;
      hasDiscount: boolean;
      discount: number | null;
      name: string;
      description: string;
      imageUrl: string | null;
      price: number;
      menu?: {
        id: number;
        hasBadge: boolean;
        badgeTag: string | null;
      };
      product?: {
        id: number;
        productType: ENUMS.ProductTypes;
      };
    }[];
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
      items: {
        id: number;
        restaurantId: number;
        hasDiscount: boolean;
        discount: number | null;
        name: string;
        description: string;
        imageUrl: string | null;
        price: number;
        menu?: {
          id: number;
          hasBadge: boolean;
          badgeTag: string | null;
        };
        product?: {
          id: number;
          productType: ENUMS.ProductTypes;
        };
      }[];
    } | null;
  };
  message: string | Errors;
  code: number;
}

export interface getRestaurantOrdersResponse {
  data: {
    orders: {
      id: number;
      userId: number;
      restaurantId: number;
      status: ENUMS.OrderStatusTypes;
      orderDate: Date;
      deliveredDate: Date | null;
      deliveryType: ENUMS.DeliveryTypes;
      cost: number;
    }[];
    totalCount: number;
  };
  message: string | Errors;
  code: number;
}

export interface getRestaurantsResponse {
  data: {
    totalCount: number;
    restaurants: {
      id: number;
      name: string;
      minimumPrice: number;
      deliveryTime: number;
      isBusy: boolean;
      hasDelivery: boolean;
      imageUrl: string | null;
      deliveryPrice: number | null;
    }[];
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

export interface getUserOrdersResponse {
  data: {
    orders: {
      id: number;
      userId: number;
      restaurantId: number;
      restaurantName: string;
      status: ENUMS.OrderStatusTypes;
      orderDate: Date;
      deliveredDate: Date | null;
      deliveryType: ENUMS.DeliveryTypes;
      cost: number;
    }[];
    totalCount: number;
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
