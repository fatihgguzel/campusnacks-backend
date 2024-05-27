import { Router, Request, Response } from 'express';
import j2s from 'joi-to-swagger';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import * as Helpers from '../helpers';
import User from '../database/models/User';
import * as UserService from '../services/userService';
import * as RequireAuth from '../middlewares/requireAuth';
import * as RequestObjectsTypes from '../types/requestObjects';
import * as RestaurantService from '../services/restaurantService';
import validate from '../middlewares/validator';

const router = Router();

export const swUserRouter = {
  '/api/user': {
    get: {
      summary: 'Get user details',
      tags: ['User'],
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getUserDetailsResponse).swagger,
            },
          },
        },
      },
    },
    put: {
      summary: 'Update user details',
      tags: ['User'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.putUpdateUserBody).swagger,
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
  '/api/user/order': {
    post: {
      summary: 'Give order',
      tags: ['User'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postCreateOrderBody).swagger,
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
  '/api/user/orders': {
    get: {
      summary: 'Get user orders',
      tags: ['User'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'query',
          name: 'active',
          schema: {
            type: 'boolean',
          },
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'number',
          },
        },
        {
          in: 'query',
          name: 'offset',
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getUserOrdersResponse).swagger,
            },
          },
        },
      },
    },
  },
  '/api/user/orders/{orderId}': {
    get: {
      summary: 'Get order details',
      tags: ['User'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'orderId',
          description: 'Id of the order',
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getOrderDetailsResponse).swagger,
            },
          },
        },
      },
    },
  },
};

router.get('/', RequireAuth.requireJwt, async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const userDetails = await UserService.getUserDetails({ userId: user.id });

    Helpers.response(res, {
      data: userDetails,
      message: '',
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

router.post('/order', async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const body = req.body as RequestObjectsTypes.postCreateOrderBody;

    await RestaurantService.createOrder({ userId: user.id, restaurantId: body.restaurantId, items: body.items });

    Helpers.response(res, {
      message: '',
      code: 201,
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

router.put('/', validate({ body: RequestObjects.putUpdateUserBody }), async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const body = req.body as RequestObjectsTypes.putUpdateUserbody;

    await UserService.updateUser({ userId: user.id, phoneNumber: body.phoneNumber, address: body.address });

    Helpers.response(res, {
      message: '',
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

router.get(
  '/orders',
  validate({ query: RequestObjects.getRestaurantOrdersQuery }),
  async (req: Request, res: Response) => {
    try {
      const user = req.user as User;
      const query = req.query as unknown as RequestObjectsTypes.getRestaurantOrdersQuery;

      const ordersResponse = await UserService.getUserOrders({
        getActiveOrders: query.active!,
        userId: user.id,
        limit: query.limit,
        offset: query.offset,
      });

      Helpers.response(res, {
        data: ordersResponse,
        message: '',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.get(
  '/orders/:orderId',
  validate({ params: RequestObjects.orderIdParams }),
  async (req: Request, res: Response) => {
    try {
      const params = req.params as unknown as RequestObjectsTypes.orderIdParams;

      const orderDetails = await RestaurantService.getOrderDetails({
        orderId: params.orderId,
      });

      Helpers.response(res, {
        message: '',
        data: { order: orderDetails },
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

export default router;
