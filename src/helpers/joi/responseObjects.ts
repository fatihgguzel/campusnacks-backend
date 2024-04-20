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
