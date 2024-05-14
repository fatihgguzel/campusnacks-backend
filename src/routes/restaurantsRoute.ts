import { Router, Request, Response } from 'express';
import j2s from 'joi-to-swagger';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import * as Helpers from '../helpers';
import { RestaurantService } from '../services';
import paginate from '../middlewares/pagination';

const router = Router();

export const swRestaurantsRouter = {
  '/api/restaurants/': {
    get: {
      summary: 'Get all restaurants with pagination',
      tags: ['Restaurant'],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.getAllRestaurantsResponse).swagger,
            },
          },
        },
      },
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page number of results to retrieve',
          required: true,
          schema: {
            type: 'integer',
            default: 1,
          },
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Maximum number of restaurants to include per page',
          required: true,
          schema: {
            type: 'integer',
            default: 10,
          },
        },
      ],
    },
  },
};

router.get('/', paginate(), async (req: Request, res: Response) => {
  try {
    const page = req.query.page as unknown as number;
    const limit = req.query.limit as unknown as number;

    const offset = (page - 1) * limit;

    const result = await RestaurantService.getRestaurants({
      limit: limit,
      offset: offset,
    });

    Helpers.response(res, {
      data: result,
      message: '',
    });
  } catch (err) {
    Helpers.error(res, err);
  }
});

export default router;
