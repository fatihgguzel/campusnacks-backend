import { Router, Request, Response } from 'express';
import j2s from 'joi-to-swagger';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import * as Helpers from '../helpers';
import User from '../database/models/User';
import * as UserService from '../services/userService';
import * as RequireAuth from '../middlewares/requireAuth';

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

export default router;
