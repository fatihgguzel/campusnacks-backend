import User from '../database/models/User';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import * as Enums from '../types/enums';
import { Logger } from '../helpers';

interface ICheckIsAdminOptions {
  userId: number;
}
export async function checkIsAdmin(options: ICheckIsAdminOptions) {
  const user = await User.findOne({
    where: {
      id: options.userId,
    },
  });

  if (!user) {
    throw new AppError(Errors.USER_NOT_FOUND, 404);
  }

  if (
    !(
      user.role === Enums.UserRoleTypes.ADMIN ||
      user.role === Enums.UserRoleTypes.SUPERADMIN ||
      user.email === 'admin@campusnacks.com'
    )
  ) {
    throw new AppError(Errors.NOT_AUTHORIZED, 400);
  }
}

interface ICheckIsSuperAdminOptions {
  userId: number;
}
export async function checkIsSuperAdmin(options: ICheckIsSuperAdminOptions) {
  const user = await User.findOne({
    where: {
      id: options.userId,
    },
  });

  if (!user) {
    throw new AppError(Errors.USER_NOT_FOUND, 404);
  }

  if (user.email === 'admin@campusnacks.com') {
    return;
  }

  if (user.role !== Enums.UserRoleTypes.SUPERADMIN) {
    throw new AppError(Errors.NOT_AUTHORIZED, 400);
  }
}

interface IAuthorizeUserOptions {
  adminId: number;
  userId: number;
  adminRole: Enums.AdminStates;
}
export async function authorizeUser(options: IAuthorizeUserOptions) {
  if (options.adminId === options.userId) {
    throw new AppError(Errors.API_ERROR, 400);
  }

  const user = await User.findOne({
    where: {
      id: options.userId,
    },
  });

  if (!user || user.email === 'admin@campusnacks.com') {
    throw new AppError(Errors.USER_NOT_FOUND, 404);
  }

  await checkIsSuperAdmin({ userId: options.adminId });

  const changeSet = {
    role: options.adminRole === Enums.AdminStates.ADMIN ? Enums.UserRoleTypes.ADMIN : Enums.UserRoleTypes.SUPERADMIN,
  };

  await user.update(changeSet);

  await Logger.log({
    service: 'adminService',
    function: 'authorizeUser',
    message: 'give admin role to user',
    data: {
      ...options,
    },
  });
}
