import { Router, Request, Response } from 'express';
import j2s from 'joi-to-swagger';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import validate from '../middlewares/validator';
import * as Helpers from '../helpers';
import * as RequestObjectsTypes from '../types/requestObjects';
import * as RequireAuth from '../middlewares/requireAuth';
import { RestaurantService } from '../services';
import Restaurant from '../database/models/Restaurant';

const router = Router();

export const swRestaurantRouter = {
  '/api/restaurant': {
    get: {
      summary: 'Get restaurant details',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getRestaurantDetailsResponse).swagger,
            },
          },
        },
      },
    },
    put: {
      summary: 'Update restaurant',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.putUpdateRestaurantBody).swagger,
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
  '/api/restaurant/item': {
    post: {
      summary: 'Add item to restaurant',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postRestaurantAddItemBody).swagger,
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
  '/api/restaurant/item/{itemId}': {
    put: {
      summary: 'edit item',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'itemId',
          description: 'Id of the item',
          schema: {
            type: 'number',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.putEditItemBody).swagger,
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
    delete: {
      summary: 'Delete item',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'itemId',
          description: 'Id of the item',
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
  '/api/restaurant/orders': {
    get: {
      summary: 'Get restaurants orders',
      tags: ['Restaurant'],
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
              schema: j2s(ResponseObjects.getRestaurantOrdersResponse).swagger,
            },
          },
        },
      },
    },
    put: {
      summary: 'Update order',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.putUpdateOrderBody).swagger,
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
  '/api/restaurant/orders/{orderId}': {
    get: {
      summary: 'Get order details',
      tags: ['Restaurant'],
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
    const restaurant = req.user as Restaurant;

    const restaurantDetails = await RestaurantService.getRestaurantDetails({ restaurantId: restaurant.id });

    Helpers.response(res, {
      data: restaurantDetails,
      message: '',
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

router.put(
  '/',
  validate({
    body: RequestObjects.putUpdateRestaurantBody,
  }),
  async (req: Request, res: Response) => {
    try {
      const restaurant = req.user as Restaurant;
      const body = req.body as RequestObjectsTypes.putUpdateRestaurantBody;

      await RestaurantService.updateRestaurant({
        restaurantId: restaurant.id,
        phone: body.phone,
        imageUrl: body.imageUrl,
        hasDelivery: body.hasDelivery,
        deliveryPrice: body.deliveryPrice,
        minimumPrice: body.minimumPrice,
        deliveryTime: body.deliveryTime,
        isBusy: body.isBusy,
        city: body.city,
        district: body.district,
        address: body.address,
        nHood: body.nHood,
        street: body.street,
        no: body.no,
        isOpen: body.isOpen,
      });

      Helpers.response(res, {
        message: 'Restaurant is updated successfully',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.post(
  '/item',
  validate({ body: RequestObjects.postRestaurantAddItemBody }),
  async (req: Request, res: Response) => {
    try {
      const restaurant = req.user as Restaurant;
      const body = req.body as RequestObjectsTypes.postRestaurantAddItemBody;

      await RestaurantService.addItem({
        restaurantId: restaurant.id,
        name: body.name,
        description: body.description,
        price: body.price,
        itemType: body.itemType,
        imageUrl: body.imageUrl!,
      });

      Helpers.response(res, {
        message: '',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.get(
  '/orders',
  validate({ query: RequestObjects.getRestaurantOrdersQuery }),
  async (req: Request, res: Response) => {
    try {
      const restaurant = req.user as Restaurant;
      const query = req.query as unknown as RequestObjectsTypes.getRestaurantOrdersQuery;

      const ordersResponse = await RestaurantService.getRestaurantOrders({
        getActiveOrders: query.active!,
        restaurantId: restaurant.id,
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

router.put('/orders', validate({ body: RequestObjects.putUpdateOrderBody }), async (req: Request, res: Response) => {
  try {
    const restaurant = req.user as Restaurant;
    const body = req.body as RequestObjectsTypes.putUpdateOrderBody;

    await RestaurantService.updateOrder({
      restaurantId: restaurant.id,
      orderStatus: body.status,
      orderId: body.orderId,
    });

    Helpers.response(res, {
      message: '',
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

router.get(
  '/orders/:orderId',
  validate({ params: RequestObjects.orderIdParams }),
  async (req: Request, res: Response) => {
    try {
      const restaurant = req.user as Restaurant;
      const params = req.params as unknown as RequestObjectsTypes.orderIdParams;

      const orderDetails = await RestaurantService.getOrderDetails({
        orderId: params.orderId,
        restaurantId: restaurant.id,
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

router.put(
  '/item/:itemId',
  validate({ params: RequestObjects.itemIdParams, body: RequestObjects.putEditItemBody }),
  async (req: Request, res: Response) => {
    try {
      const restaurant = req.user as Restaurant;
      const params = req.params as unknown as RequestObjectsTypes.itemIdParams;
      const body = req.body as RequestObjectsTypes.putEditItemBody;

      await RestaurantService.editItem({
        restaurantId: restaurant.id,
        itemId: params.itemId,
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
      });

      Helpers.response(res, {
        message: '',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.delete(
  '/item/:itemId',
  validate({ params: RequestObjects.itemIdParams }),
  async (req: Request, res: Response) => {
    try {
      const restaurant = req.user as Restaurant;
      const params = req.params as unknown as RequestObjectsTypes.itemIdParams;

      await RestaurantService.deleteItem({
        restaurantId: restaurant.id,
        itemId: params.itemId,
      });

      Helpers.response(res, {
        message: '',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

export default router;
