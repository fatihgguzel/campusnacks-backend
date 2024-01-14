import { Response } from 'express';

interface ResponseData {
  message: string;
  code?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any> | null;
}

export default function (res: Response, data: ResponseData) {
  res.status(data.code || 200).json({
    code: data.code || 200,
    data: null,
    ...data,
  });
}
