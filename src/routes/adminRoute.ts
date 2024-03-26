import { Router, Request, Response } from 'express';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import j2s from 'joi-to-swagger';
import validate from '../middlewares/validator';
import * as Helpers from '../helpers';
import * as RequestObjectTypes from '../types/requestObjects';
import { AdminService } from '../services';

const router = Router();

export const swAdminRouter = {
  '/api/admin/restaurant/{restaurantId}': {
    delete: {
      summary: 'Delete restaurant with given id',
      tags: ['Admin'],
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
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.deleteAdminRestaurantResponse).swagger,
            },
          },
        },
      },
    },
  },
};

router.delete(
  '/restaurant/:restaurantId',
  validate({
    params: RequestObjects.deleteAdminRestaurantParams,
  }),
  async (req: Request, res: Response) => {
    try {
      const params = req.params as unknown as RequestObjectTypes.deleteAdminRestaurantParams;

      await AdminService.deleteRestaurant({
        restaurantId: params.restaurantId,
      });

      Helpers.response(res, {
        message: 'Restaurant is deleted successfully',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

export default router;
