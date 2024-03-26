import * as joi from 'joi';
import * as genericJoi from './joiGeneric';
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

export const postForgotPasswordResponse = genericJoi
  .obj({
    ...defaultResponse,
  })
  .required()
  .label('postForgotPasswordResponse');

export const postResetPasswordResponse = genericJoi
  .obj({
    ...defaultResponse,
  })
  .required()
  .label('postResetPasswordResponse');

export const deleteAdminRestaurantResponse = genericJoi
  .obj({
    ...defaultResponse,
  })
  .required()
  .label('deleteAdminRestaurantResponse');
