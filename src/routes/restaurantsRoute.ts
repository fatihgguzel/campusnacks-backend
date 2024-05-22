import { Router, Request, Response } from 'express';
import j2s from 'joi-to-swagger';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import validate from '../middlewares/validator';
import * as Helpers from '../helpers';
import * as RequestObjectsTypes from '../types/requestObjects';
import { RestaurantService } from '../services';

const router = Router();

export const swRestaurantsRouter = {
  '/api/restaurants': {
    get: {
      summary: 'Get restaurants',
      tags: ['Restaurants'],
      parameters: [
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
        {
          in: 'query',
          name: 'campus',
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
  '/api/restaurants/{restaurantId}': {
    get: {
      summary: 'Get restaurant details with food for public page',
      tags: ['Restaurants'],
      parameters: [
        {
          in: 'path',
          name: 'restaurantId',
          description: 'Id of the restaurant',
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getRestaurantContentResponse).swagger,
            },
          },
        },
      },
    },
  },
};

router.get('/', validate({ query: RequestObjects.getRestaurantsQuery }), async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as RequestObjectsTypes.getRestaurantsQuery;

    const { totalCount, restaurants } = await RestaurantService.getRestaurants({
      campus: query.campus!,
      limit: query.limit,
      offset: query.offset,
    });

    Helpers.response(res, {
      data: { totalCount, restaurants },
      message: '',
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

router.get(
  '/:restaurantId',
  validate({ params: RequestObjects.getRestaurantContentParams }),
  async (req: Request, res: Response) => {
    try {
      const params = req.params as unknown as RequestObjectsTypes.getRestaurantContentParams;

      const restaurantContent = await RestaurantService.getRestaurantContent({
        restaurantId: params.restaurantId,
      });

      Helpers.response(res, {
        data: {
          ...restaurantContent,
        },
        message: '',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

export default router;
