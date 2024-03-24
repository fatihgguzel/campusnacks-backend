import { Request, Response, Router } from 'express';
import fs from 'fs';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import validate from '../middlewares/validator';
import * as RequestObjects from '../helpers/joi/requestObjects';
import * as ResponseObjects from '../helpers/joi/responseObjects';
import * as RequestObjectsTypes from '../types/requestObjects';
import j2s from 'joi-to-swagger';
import * as Helpers from '../helpers';
import * as path from 'path';

const router = Router();

export const swConfigRouter = {
  '/api/config/types/{fileName}': {
    get: {
      summary: 'Returns type file',
      tags: ['Config'],
      parameters: [
        {
          in: 'path',
          name: 'fileName',
          description: 'OPTIONS: requestObjects, responseObjects, Errors, enums',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          content: {
            'application/json': {
              schema: j2s(ResponseObjects.defaultResponseSchema),
            },
          },
        },
      },
    },
  },
};

router.get(
  '/types/:fileName',
  validate({
    params: RequestObjects.getConfigTypeFileParams,
  }),
  async (req: Request, res: Response) => {
    try {
      const params = req.params as unknown as RequestObjectsTypes.getConfigTypeFileParams;

      const availableFiles = ['requestObjects', 'responseObjects', 'enums', 'Errors'];

      if (!availableFiles.includes(params.fileName)) {
        throw new AppError(Errors.API_ERROR, 500);
      }

      const filePath = path.join(__dirname, '../../src', `/types/${params.fileName}.ts`);

      if (!fs.existsSync(filePath)) {
        throw new AppError(Errors.FILE_NOT_FOUND, 404);
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      res.send(fileContent);
    } catch (err) {
      Helpers.error(res, err);
    }
  },
);

export default router;
