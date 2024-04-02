import { Router, Request, Response } from 'express';
import j2s from 'joi-to-swagger';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import validate from '../middlewares/validator';
import * as Helpers from '../helpers';
import * as RequestObjectsTypes from '../types/requestObjects';
import { RestaurantService } from '../services';

const router = Router();

export const swRestaurantRouter = {
  '/api/restaurant/{restaurantId}': {
    put: {
      summary: 'Update restaurant by its id',
      tags: ['Restaurant'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'restaurantId',
          description: 'Id of restaurant as number',
          schema: {
            type: 'number',
          },
        },
      ],
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

router.put(
  '/:restaurantId',
  validate({
    body: RequestObjects.putUpdateRestaurantBody,
    params: RequestObjects.putUpdateRestaurantParams,
  }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as RequestObjectsTypes.putUpdateRestaurantBody;
      const params = req.params as unknown as RequestObjectsTypes.putUpdateRestaurantParams;

      await RestaurantService.updateRestaurant({
        restaurantId: params.restaurantId,
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
