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

export default router;
