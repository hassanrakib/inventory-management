import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if headers have already been sent to the client
  // delegate error handling to express
  if (res.headersSent) {
    return next(err);
  }

  console.log(err);
  res
    .status(500)
    .json({
      success: false,
      message: (err as Error)?.message || 'Something went wrong!',
    });
};
