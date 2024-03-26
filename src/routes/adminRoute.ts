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
  '/api/admin/restaurant': {
    post: {
      summary: 'Create restaurant with given values',
      tags: ['Admin'],
      requestBody: {
        content: {
          'application/json': {
            schema: j2s(RequestObjects.createAdminRestaurantBody).swagger,
          },
        },
      },
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.createAdminRestaurantResponse).swagger,
            },
          },
        },
      },
    },
  },
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

router.post(
  '/restaurant',
  validate({
    body: RequestObjects.createAdminRestaurantBody,
  }),
  async (req: Request, res: Response) => {
    try {
      const body = req.body as unknown as RequestObjectTypes.createAdminRestaurantBody;

      await AdminService.createRestaurant({
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address,
        imageUrl: body.imageUrl,
        hasDelivery: body.hasDelivery,
        deliveryPrice: body.deliveryPrice,
        minimumPrice: body.minimumPrice,
        deliveryTime: body.deliveryTime,
        isBusy: body.isBusy,
        city: body.city,
        district: body.district,
        nHood: body.nHood,
        no: body.no,
        street: body.street,
      });

      Helpers.response(res, {
        message: 'Restaurant is created successfully',
      });
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

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
