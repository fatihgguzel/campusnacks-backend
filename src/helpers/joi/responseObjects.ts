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
    }),
  }),
});

export const getAllRestaurantsResponse = genericJoi.obj({
  ...defaultResponse,
  data: genericJoi.obj({
    count: genericJoi.num,
    restaurants: genericJoi.array.items({
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
      }),
    }),
  }),
});
