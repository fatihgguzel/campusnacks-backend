import { NextFunction, Request, Response } from 'express';
import { error, Logger } from '../helpers';
import { AppError } from '../errors/AppError';
import User from '../database/models/User';
import { Errors } from '../types/Errors';
import Restaurant from '../database/models/Restaurant';

export enum REQUIRE_ROLES {
  USER = 'user',
  RESTAURANT = 'restaurant',
}

export default function requireRole(requireRole: REQUIRE_ROLES) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      switch (requireRole) {
        case REQUIRE_ROLES.USER:
          if ((req.user as User).fullName) {
            next();
            break;
          } else {
            throw new AppError(Errors.NOT_AUTHORIZED);
          }
        case REQUIRE_ROLES.RESTAURANT:
          if ((req.user as Restaurant).slug) {
            next();
            break;
          } else {
            throw new AppError(Errors.NOT_AUTHORIZED);
          }
      }
    } catch (e) {
      const err = e as Error;
      Logger.error({
        service: 'requireRole',
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
