import { Logger, response } from '../index';
import { Response } from 'express';
import { Errors } from '../../types/Errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (res: Response, err: any) {
  Logger.error({
    service: 'helper',
    function: 'error',
    message: err.message || Errors.API_ERROR,
    data: {
      err,
      req: {
        url: res.req.originalUrl,
        body: res.req.body,
        requestedIP: res.req.clientIp,
        headers: {
          Authorization: res.req.header('Authorization') || 'NO_AUTH_HEADER',
          userAgent: res.req.header('user-agent') || 'NO_USER_AGENT',
        },
      },
    },
  });

  const errorMessage = Object.values(Errors).includes(err.message)
    ? err.message
    : process.env.ENV_NAME === 'PROD'
      ? Errors.API_ERROR
      : err.message;

  response(res, {
    message: errorMessage,
    code: typeof err.code === 'number' ? err.code || 500 : 500,
  });
}
