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
  } catch (err: unknown) {
    next(err);
  }
};

const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await ProductServices.retrieveProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data,
    });
  } catch (err: unknown) {
    next(err);
  }
};

const fetchAProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const data = await ProductServices.retrieveAProductByIdFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const updateAProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get update object & productId
    const {
      body: update,
      params: { productId },
    } = req;
    const updateResult = await ProductServices.updateAProductByIdInDB(
      productId,
      update
    );

    if (updateResult.modifiedCount) {
      const updatedData =
        await ProductServices.retrieveAProductByIdFromDB(productId);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedData,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteAProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const deleteResult =
      await ProductServices.deleteAProductByIdFromDB(productId);

    if (deleteResult.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const ProductControllers = {
  createProduct,
  fetchProducts,
  fetchAProductById,
  updateAProductById,
  deleteAProductById,
};
