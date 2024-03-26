import { Request, Response, Router } from 'express';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import * as RequestObjectsTypes from '../types/requestObjects';
import validate from '../middlewares/validator';
import * as Enums from '../types/enums';
import j2s from 'joi-to-swagger';
import * as Helpers from '../helpers';
import { AuthService } from '../services';
import * as RequireAuth from '../middlewares/requireAuth';
import User from '../database/models/User';

const router = Router();

export const swAuthRouter = {
  '/api/auth/login': {
    post: {
      summary: 'Returns JWT after a successful login',
      tags: ['Auth'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postLoginBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.postLoginResponse).swagger,
            },
          },
          description: 'Includes JWT Token',
        },
      },
    },
  },
  '/api/auth/register': {
    post: {
      summary: 'Register user',
      tags: ['Auth'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postRegisterBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.postRegisterResponse).swagger,
            },
          },
        },
      },
    },
  },
  '/api/auth/password/email': {
    post: {
      summary: 'Send password reset link to email',
      tags: ['Auth'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postForgotPasswordBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.postForgotPasswordResponse).swagger,
            },
          },
        },
      },
    },
  },
  '/api/auth/password/reset': {
    post: {
      summary: 'Update password of user',
      tags: ['Auth'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postResetPasswordBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.postResetPasswordResponse).swagger,
            },
          },
        },
      },
    },
  },
  '/api/auth/refresh': {
    get: {
      summary: 'Refresh user token',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getRefreshTokenResponse).swagger,
            },
          },
        },
      },
    },
  },
};

router.post(
  '/register',
  validate({
    body: RequestObjects.postRegisterBody,
  }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as RequestObjectsTypes.postRegisterBody;

      const { authToken } = await AuthService.registerUser({
        email: body.email,
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        role: Enums.UserRoleTypes.DEFAULT,
        provider: Enums.UserProviders.CAMPUSNACKS,
        password: body.password,
        city: body.city,
        district: body.district,
        address: body.address,
      });

      Helpers.response(res, {
        data: {
          authToken,
        },
        message: 'Successfully registered',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.post(
  '/login',
  validate({
    body: RequestObjects.postLoginBody,
  }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as RequestObjectsTypes.postLoginBody;

      const { authToken } = await AuthService.loginUser({
        email: body.email,
        password: body.password,
      });

      Helpers.response(res, {
        data: {
          authToken,
        },
        message: 'Successfully logged in',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.post(
  '/password/email',
  validate({ body: RequestObjects.postForgotPasswordBody }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as RequestObjectsTypes.postForgotPasswordBody;

      await AuthService.forgotPassword({
        email: body.email,
      });

      Helpers.response(res, { message: 'Password reset email is sent successfully' });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.post(
  '/password/reset',
  validate({ body: RequestObjects.postResetPasswordBody }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as RequestObjectsTypes.postResetPasswordBody;

      await AuthService.resetPassword({
        email: body.email,
        shortCode: body.shortCode,
        newPassword: body.newPassword,
      });

      Helpers.response(res, { message: 'Password updated sucessfully' });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.get('/refresh', RequireAuth.requireJwt, async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    Helpers.response(res, {
      message: '',
      data: {
        authToken: AuthService.refreshToken({
          userId: user.id,
          secureCode: user.jwtSecureCode,
        }),
      },
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

export default router;
