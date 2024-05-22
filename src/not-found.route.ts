import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

const notFoundRouter = express.Router();

notFoundRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`${req.path} not found!`);

  // call the error handler
  next(error);
});

export const NotFoundRoutes = notFoundRouter;
