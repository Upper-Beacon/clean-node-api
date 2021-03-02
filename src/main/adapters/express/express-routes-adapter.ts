import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../../presentation/protocols';

export const adaptRoute = (controller: Controller) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
  };
  const httpResponse = await controller.handle(httpRequest);

  return httpResponse.statusCode === 200
    ? res.status(httpResponse.statusCode).json(httpResponse.body)
    : res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
};
