import { Router, Request, Response } from 'express';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import j2s from 'joi-to-swagger';
import validate from '../middlewares/validator';
import * as Helpers from '../helpers';
import * as RequestObjectTypes from '../types/requestObjects';
import { RestaurantService, AdminService } from '../services';
import User from '../database/models/User';

const router = Router();

export const swAdminRouter = {
  '/api/admin/restaurant': {
    post: {
      summary: 'Create restaurant with given values',
      tags: ['Admin'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postCreateRestaurantBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.defaultResponseSchema).swagger,
            },
          },
        },
      },
    },
  },
  '/api/admin/authorize/{userId}': {
    put: {
      summary: 'give admin role to a user',
      security: [{ bearerAuth: [] }],
      tags: ['Admin'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.putAuthorizeAdminUserBody).swagger,
          },
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'userId',
          description: 'Id of the user',
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.defaultResponseSchema).swagger,
            },
          },
        },
      },
    },
  },
  '/api/admin/restaurant/{restaurantId}': {
    delete: {
      summary: 'Delete restaurant',
      tags: ['Admin'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'restaurantId',
          description: 'id of the restaurant',
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.defaultResponseSchema).swagger,
            },
          },
        },
      },
    },
  },
};

router.post(
  '/restaurant',
  validate({
    body: RequestObjects.postCreateRestaurantBody,
  }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as User;
      const body = req.body as RequestObjectTypes.postCreateRestaurantBody;

      await AdminService.checkIsAdmin({ userId: user.id });

      await RestaurantService.createRestaurant({
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address,
        imageUrl: body.imageUrl,
        city: body.city,
        district: body.district,
        nHood: body.nHood,
        no: body.no,
        street: body.street,
        campus: body.campus!,
        password: body.password,
      });

      Helpers.response(res, {
        message: 'Restaurant is created successfully',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.put(
  '/authorize/:userId',
  validate({ body: RequestObjects.putAuthorizeAdminUserBody, params: RequestObjects.putAuthorizeAdminUserParams }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as User;
      const body = req.body as RequestObjectTypes.putAuthorizeAdminUserBody;
      const params = req.params as unknown as RequestObjectTypes.putAuthorizeAdminUserParams;

      await AdminService.authorizeUser({ adminId: user.id, userId: params.userId, adminRole: body.role });

      Helpers.response(res, {
        message: 'OK',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.delete(
  '/:restaurantId',
  validate({ params: RequestObjects.deleteAdminRestaurantParams }),
  async (req: Request, res: Response) => {
    try {
      const params = req.params as unknown as RequestObjectTypes.deleteAdminRestaurantParams;
      const user = req.user as User;

      await AdminService.checkIsAdmin({ userId: user.id });

      await RestaurantService.deleteRestaurant({ restaurantId: params.restaurantId });

      Helpers.response(res, {
        message: 'OK',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

export default router;
