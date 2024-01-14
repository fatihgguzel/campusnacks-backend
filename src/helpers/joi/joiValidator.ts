import * as joi from 'joi';
import { AppError } from '../../errors/AppError';
import { Errors } from '../../types/Errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (data: any, schema: joi.Schema | null = null) {
  if (!schema) {
    throw new AppError(Errors.JOI_SCHEMA_NOT_FOUND, 500);
  }

  return schema.validateAsync(data, {
    // https://joi.dev/api/?v=17.9.1#anyvalidatevalue-options
  });
}
