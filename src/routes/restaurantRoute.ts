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
            schema: j2s(RequestObjects.updateRestaurantBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.updateRestaurantResponse).swagger,
            },
          },
        },
      },
    },
  },
  '/api/restaurant/business-hour': {
    post: {
      summary: 'Create business hour for up to 7 days',
      tags: ['Restaurant'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.postBusinessHoursBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.postBusinessHoursResponse).swagger,
            },
          },
        },
      },
    },
  },
};

router.post(
  '/business-hours',
  validate({
    body: RequestObjects.postBusinessHoursBody,
  }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as RequestObjectsTypes.postBusinessHoursBody;
      console.log(body);
      await RestaurantService.createBusinessHours();

      Helpers.response(res, {
        message: 'Created business hours successfully',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

router.put(
  '/:restaurantId',
  validate({
    body: RequestObjects.updateRestaurantBody,
    params: RequestObjects.updateRestaurantParams,
  }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as unknown as RequestObjectsTypes.updateRestaurantBody;
      const params = req.params as unknown as RequestObjectsTypes.updateRestaurantParams;

      await RestaurantService.updateRestaurant({
        restaurantId: params.restaurantId,
        ...body,
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
