import { NextFunction, Request, Response } from 'express';
import { error } from '../helpers';
import { AppError } from '../errors/AppError';
import { paginationQuery } from '../helpers/joi/requestObjects';
import { Errors } from '../types/Errors';

export default function paginate() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error: validationError } = paginationQuery.validate(req.query);

      if (validationError) {
        throw new AppError(Errors.PAGINATION_ERROR);
      }
      next();
    } catch (e) {
      const err = e as Error;
      error(res, new AppError(err.message, 400));
    }
  };
}
