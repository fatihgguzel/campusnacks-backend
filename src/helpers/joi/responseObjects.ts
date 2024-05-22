import * as joi from 'joi';
import * as genericJoi from './joiGeneric';
import * as Enums from '../../types/enums';
import { Errors } from '../../types/Errors';

const defaultResponse = {
  data: genericJoi.objNullable(),
  message: joi
    .string()
    .valid('', ...Object.values(Errors))
    .label('string | Errors'),
  code: genericJoi.num,
};

export const defaultResponseSchema = genericJoi
  .obj({
    ...defaultResponse,
  })
  .label('defaultResponseSchema');

// RESPONSES

export const postLoginResponse = genericJoi
  .obj({
    ...defaultResponse,
    data: genericJoi.obj({
      authToken: genericJoi.stringTrimmed,
    }),
  })
  .required()
  .label('postLoginResponse');

export const postRegisterResponse = genericJoi
  .obj({
    ...defaultResponse,
    data: genericJoi.obj({
      authToken: genericJoi.stringTrimmed,
    }),
  })
  .required()
  .label('postRegisterResponse');

export const getRefreshTokenResponse = genericJoi
  .obj({
    ...defaultResponse,
    data: genericJoi.obj({
      authToken: genericJoi.stringTrimmed,
    }),
  })
  .required()
  .label('getRefreshTokenResponse');

export const getUserDetailsResponse = genericJoi.obj({
  ...defaultResponse,
  data: genericJoi.obj({
    user: genericJoi.objNullable({
      id: genericJoi.num,
      email: genericJoi.email,
      fullName: genericJoi.stringTrimmed,
      address: genericJoi.obj({
        id: genericJoi.num,
        city: genericJoi.stringTrimmed,
        district: genericJoi.stringTrimmed,
        address: genericJoi.stringTrimmed,
      }),
      phoneNumber: genericJoi.stringTrimmed,
      role: genericJoi.stringEnum(Enums.UserRoleTypes, 'UserRoleTypes'),
      provider: genericJoi.stringEnum(Enums.UserProviders, 'UserProviders'),
    }),
    meta: genericJoi.obj({
      studentshipExpiresAt: genericJoi.date.optional(),
    }),
  }),
});

export const getRestaurantDetailsResponse = genericJoi.obj({
  ...defaultResponse,
  data: genericJoi.obj({
    restaurant: genericJoi.objNullable({
      id: genericJoi.num,
      name: genericJoi.stringTrimmed,
      phone: genericJoi.stringTrimmed,
      email: genericJoi.email,
      address: genericJoi.obj({
        id: genericJoi.num,
        city: genericJoi.stringTrimmed,
        district: genericJoi.stringTrimmed,
        address: genericJoi.stringTrimmed,
        nHood: genericJoi.stringTrimmed,
        street: genericJoi.stringTrimmed,
        no: genericJoi.stringTrimmed,
      }),
      imageUrl: genericJoi.stringTrimmed.allow(null),
      hasDelivery: genericJoi.boolean,
      deliveryPrice: genericJoi.num.allow(null),
      minimumPrice: genericJoi.num,
      deliveryTime: genericJoi.num,
      isBusy: genericJoi.boolean,
      isOpen: genericJoi.boolean,
      slug: genericJoi.stringTrimmed,
      campus: genericJoi.stringEnum(Enums.Campuses, 'Campuses'),
      items: genericJoi.arr(
        genericJoi.obj({
          id: genericJoi.num,
          restaurantId: genericJoi.num,
          hasDiscount: genericJoi.boolean,
          discount: genericJoi.num.allow(null),
          name: genericJoi.stringTrimmed,
          description: genericJoi.stringTrimmed,
          imageUrl: genericJoi.stringTrimmed.allow(null),
          price: genericJoi.num,
          menu: genericJoi
            .obj({
              id: genericJoi.num,
              hasBadge: genericJoi.boolean,
              badgeTag: genericJoi.stringTrimmed.allow(null),
            })
            .optional(),
          product: genericJoi
            .obj({
              id: genericJoi.num,
              productType: genericJoi.stringEnum(Enums.ProductTypes, 'ProductTypes'),
            })
            .optional(),
        }),
      ),
    }),
  }),
});

export const getRestaurantsResponse = genericJoi.obj({
  ...defaultResponse,
  data: genericJoi.obj({
    totalCount: genericJoi.num,
    restaurants: genericJoi.arr(
      genericJoi.obj({
        id: genericJoi.num,
        name: genericJoi.stringTrimmed,
        minimumPrice: genericJoi.num,
        deliveryTime: genericJoi.num,
        isBusy: genericJoi.boolean,
        hasDelivery: genericJoi.boolean,
        imageUrl: genericJoi.stringTrimmed.allow(null),
        deliveryPrice: genericJoi.num.allow(null),
      }),
    ),
  }),
});

export const getRestaurantContentResponse = genericJoi.obj({
  ...defaultResponse,
  data: genericJoi.obj({
    restaurantInfo: genericJoi.obj({
      id: genericJoi.num,
      name: genericJoi.stringTrimmed,
      isOpen: genericJoi.boolean,
      hasDelivery: genericJoi.boolean,
      minimumPrice: genericJoi.num,
      imageUrl: genericJoi.stringTrimmed.allow(null),
      deliveryPrice: genericJoi.num.allow(null),
    }),
    items: genericJoi.arr(
      genericJoi.obj({
        id: genericJoi.num,
        restaurantId: genericJoi.num,
        hasDiscount: genericJoi.boolean,
        discount: genericJoi.num.allow(null),
        name: genericJoi.stringTrimmed,
        description: genericJoi.stringTrimmed,
        imageUrl: genericJoi.stringTrimmed.allow(null),
        price: genericJoi.num,
        menu: genericJoi
          .obj({
            id: genericJoi.num,
            hasBadge: genericJoi.boolean,
            badgeTag: genericJoi.stringTrimmed.allow(null),
          })
          .optional(),
        product: genericJoi
          .obj({
            id: genericJoi.num,
            productType: genericJoi.stringEnum(Enums.ProductTypes, 'ProductTypes'),
          })
          .optional(),
      }),
    ),
  }),
});
