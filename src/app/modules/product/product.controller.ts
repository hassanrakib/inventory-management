import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.service';
import { TProduct } from './product.interface';
import { ProductSchema } from './product.validate';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // recieve the request with a new product
    const product: TProduct = req.body;

    // validate using zod
    ProductSchema.parse(product);

    // save to db
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
