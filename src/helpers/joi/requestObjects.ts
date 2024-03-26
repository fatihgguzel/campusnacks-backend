import * as genericJoi from './joiGeneric';

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

export const postBusinessHoursBody = genericJoi.obj({
  restaurantId: genericJoi.num.required(),
  monday: genericJoi.objNullable,
  tuesday: genericJoi.objNullable,
  wednesday: genericJoi.objNullable,
  thursday: genericJoi.objNullable,
  friday: genericJoi.objNullable,
  saturday: genericJoi.objNullable,
  sunday: genericJoi.objNullable,
});

// Param Types

export const getConfigTypeFileParams = genericJoi
  .obj({
    fileName: genericJoi.stringTrimmed.required(),
  })
  .required()
  .label('getConfigTypeFileParams');

export const createAdminRestaurantBody = genericJoi
  .obj({
    name: genericJoi.stringTrimmed.required(),
    phone: genericJoi.stringTrimmed.required(),
    email: genericJoi.email.required(),
    imageUrl: genericJoi.stringTrimmed.optional(),
    hasDelivery: genericJoi.boolean.required(),
    deliveryPrice: genericJoi.num.optional(),
    minimumPrice: genericJoi.num.required(),
    deliveryTime: genericJoi.num.required(),
    isBusy: genericJoi.boolean.required(),
    city: genericJoi.stringTrimmed.required(),
    district: genericJoi.stringTrimmed.required(),
    address: genericJoi.stringTrimmed.required(),
    nHood: genericJoi.stringTrimmed.optional(),
    street: genericJoi.stringTrimmed.required(),
    no: genericJoi.num.required(),
  })
  .required()
  .label('createAdminRestaurantBody');

export const updateRestaurantBody = genericJoi
  .obj({
    name: genericJoi.stringTrimmed.optional(),
    phone: genericJoi.stringTrimmed.optional(),
    email: genericJoi.email.optional(),
    imageUrl: genericJoi.stringTrimmed.optional(),
    hasDelivery: genericJoi.boolean.optional(),
    deliveryPrice: genericJoi.num.optional(),
    minimumPrice: genericJoi.num.optional(),
    deliveryTime: genericJoi.num.optional(),
    isBusy: genericJoi.boolean.optional(),
    city: genericJoi.stringTrimmed.optional(),
    district: genericJoi.stringTrimmed.optional(),
    address: genericJoi.stringTrimmed.optional(),
    nHood: genericJoi.stringTrimmed.optional(),
    street: genericJoi.stringTrimmed.optional(),
    no: genericJoi.num.optional(),
  })
  .required()
  .label('updateRestaurantBody');

export const updateRestaurantParams = genericJoi
  .obj({
    restaurantId: genericJoi.num.required(),
  })
  .required()
  .label('updateRestaurantParams');

export const deleteAdminRestaurantParams = genericJoi
  .obj({
    restaurantId: genericJoi.num.required(),
  })
  .required()
  .label('deleteAdminRestaurantParams');
