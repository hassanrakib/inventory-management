import { NextFunction, Request, Response } from 'express';
import TOrder from './order.interface';
import { OrderSchema } from './order.validate';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // order from the client side
    const orderFromClient: TOrder = req.body;

    // validate order document using zod
    OrderSchema.parse(orderFromClient);

    // product that the user wants to order
    const orderedProductInDB = await ProductServices.retrieveAProductByIdFromDB(
      orderFromClient.productId
    );

    const data = await OrderServices.saveOrderToDB(
      orderFromClient,
      orderedProductInDB
    );

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const retrieveOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: TOrder[] = await OrderServices.getOrdersFromDB(req.query);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const OrderControllers = {
  createOrder,
  retrieveOrders,
};
