import { Request, Response, Router } from 'express';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import * as RequestObjectsTypes from '../types/requestObjects';
import validate from '../middlewares/validator';
import * as Enums from '../types/enums';
import j2s from 'joi-to-swagger';
import * as Helpers from '../helpers';
import { AuthService } from '../services';

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

export default router;
