import * as Joi from 'joi';
import { Errors } from '../../types/Errors';

// STRINGS
export const stringTrimmed = Joi.string().trim();

export const email = stringTrimmed.email().lowercase().messages({
  'string.email': Errors.VALIDATION_EMAIL_MALFORMED,
});

export const password = stringTrimmed.min(6).messages({
  'string.min': Errors.VALIDATION_PASSWORD_LENGTH,
});

// NUMBERS
export const num = Joi.number();

// Objects

// eslint-disable-next-line
export const obj = (fields?: Record<string, any>) => {
  return Joi.object(fields || {});
};

// eslint-disable-next-line
export const objNullable = (fields?: Record<string, any>) => {
  return obj(fields || {}).allow(null);
};

export const arr = (schema: Joi.Schema) => {
  return Joi.array().items(schema).empty(Joi.array().length(0)).default([]);
};

export const stringEnum = (enums: object, name: string) => {
  return stringTrimmed.valid(...Object.values(enums)).label(`ENUMS.${name}`);
};

export const stringEnumNullable = (enums: object, name: string) => {
  return stringEnum(enums, name).allow(null).label(`ENUMS.${name} | null`);
};
