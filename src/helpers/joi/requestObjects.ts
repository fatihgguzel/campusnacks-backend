import * as genericJoi from './joiGeneric';

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
