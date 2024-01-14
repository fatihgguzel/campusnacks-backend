import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';
import { error, Logger } from '../helpers';
import joiValidator from '../helpers/joi/joiValidator';
import { AppError } from '../errors/AppError';

interface IValidateOptions {
  body?: joi.Schema;
  query?: joi.Schema;
  params?: joi.Schema;
}
export default function validate(options: IValidateOptions) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (options.body) {
        req.body = await joiValidator(req.body, options.body);
      }

      if (options.query) {
        req.query = await joiValidator(req.query, options.query);
      }

      if (options.params) {
        req.params = await joiValidator(req.params, options.params);
      }

      next();
    } catch (e) {
      const err = e as Error;
      Logger.error({
        service: 'validator',
        function: 'default',
        message: 'error',
        data: {
          err,
        },
      });
      error(res, new AppError(err.message, 400));
    }
  };
}
