import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body;
    const data = await ProductServices.saveProductToDB(product);

    // send the response to the client
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const ProductControllers = { createProduct };
