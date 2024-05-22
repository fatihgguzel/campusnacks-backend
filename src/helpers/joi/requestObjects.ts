import * as genericJoi from './joiGeneric';
import * as Enums from '../../types/enums';

// Schemas

// Body types
export const postLoginBody = genericJoi
  .obj({
    email: genericJoi.email.required(),
    password: genericJoi.password.required(),
  })
  .required()
  .label('postLoginBody');

export const postRegisterBody = genericJoi
  .obj({
    email: genericJoi.email.required(),
    fullName: genericJoi.stringTrimmed.required(),
    phoneNumber: genericJoi.stringTrimmed.required(),
    password: genericJoi.password.required(),
    city: genericJoi.stringTrimmed.required(),
    district: genericJoi.stringTrimmed.required(),
    address: genericJoi.stringTrimmed.required(),
  })
  .required()
  .label('postRegisterBody');

export const postForgotPasswordBody = genericJoi
  .obj({
    email: genericJoi.email.required(),
  })
  .required()
  .label('postForgotPasswordBody');

export const postResetPasswordBody = genericJoi
  .obj({
    email: genericJoi.email.required(),
    shortCode: genericJoi.stringTrimmed.required(),
    newPassword: genericJoi.password.required(),
  })
  .required()
  .label('postResetPasswordBody');

// Param Types

export const getConfigTypeFileParams = genericJoi
  .obj({
    fileName: genericJoi.stringTrimmed.required(),
  })
  .required()
  .label('getConfigTypeFileParams');

export const postCreateRestaurantBody = genericJoi
  .obj({
    name: genericJoi.stringTrimmed.required(),
    phone: genericJoi.stringTrimmed.required(),
    email: genericJoi.email.required(),
    imageUrl: genericJoi.stringTrimmed.optional(),
    city: genericJoi.stringTrimmed.required(),
    district: genericJoi.stringTrimmed.required(),
    address: genericJoi.stringTrimmed.required(),
    nHood: genericJoi.stringTrimmed.required(),
    street: genericJoi.stringTrimmed.required(),
    no: genericJoi.stringTrimmed.required(),
    campus: genericJoi.stringEnum(Enums.Campuses, 'Campuses').default('0').optional(),
    password: genericJoi.password.required(),
  })
  .required()
  .label('postCreateRestaurantBody');

export const putUpdateRestaurantBody = genericJoi
  .obj({
    phone: genericJoi.stringTrimmed.optional(),
    imageUrl: genericJoi.stringTrimmed.optional().allow(null),
    hasDelivery: genericJoi.boolean.optional(),
    deliveryPrice: genericJoi.num.optional().allow(null),
    minimumPrice: genericJoi.num.optional(),
    deliveryTime: genericJoi.num.optional(),
    isBusy: genericJoi.boolean.optional(),
    city: genericJoi.stringTrimmed.optional(),
    district: genericJoi.stringTrimmed.optional(),
    address: genericJoi.stringTrimmed.optional(),
    nHood: genericJoi.stringTrimmed.optional(),
    street: genericJoi.stringTrimmed.optional(),
    no: genericJoi.stringTrimmed.optional(),
    isOpen: genericJoi.boolean.optional(),
  })
  .required()
  .label('putUpdateRestaurantBody');

export const deleteAdminRestaurantParams = genericJoi
  .obj({
    restaurantId: genericJoi.num.required(),
  })
  .required()
  .label('deleteAdminRestaurantParams');

export const putAuthorizeAdminUserParams = genericJoi
  .obj({
    userId: genericJoi.num,
  })
  .required()
  .label('putAuthorizeAdminUserParams');

export const putAuthorizeAdminUserBody = genericJoi
  .obj({
    role: genericJoi.stringEnum(Enums.AdminStates, 'AdminStates').required(),
  })
  .required()
  .label('putAuthorizeAdminUserBody');

export const getRestaurantsQuery = genericJoi
  .obj({
    offset: genericJoi.num.min(0).default(0).required(),
    limit: genericJoi.num.min(0).default(16).required(),
    campus: genericJoi.stringEnum(Enums.Campuses, 'Campuses').default(Enums.Campuses.IYTE).optional(),
  })
  .required()
  .label('getRestaurantsQuery');

export const getRestaurantContentParams = genericJoi
  .obj({
    restaurantId: genericJoi.num.required(),
  })
  .required()
  .label('getRestaurantContentParams');

export const postRestaurantAddItemBody = genericJoi.obj({
  name: genericJoi.stringTrimmed.required(),
  description: genericJoi.stringTrimmed.required(),
  imageUrl: genericJoi.stringTrimmed.optional().default(null),
  price: genericJoi.num.required(),
  itemType: genericJoi.stringEnum(Enums.ItemTypes, 'ItemTypes').required(),
});
