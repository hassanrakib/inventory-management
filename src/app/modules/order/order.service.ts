import { TProduct } from '../product/product.interface';
import TOrder from './order.interface';
import { Order } from './order.model';

const saveOrderToDB = async (
  orderFromClient: TOrder,
  orderedProductInDB: TProduct | null
) => {
  // if the product that is being ordered doesn't exist in the db
  if (orderedProductInDB === null) {
    throw new Error('Ordered prodcut not found!');
  }

  // if the order quantity is higher than product inventory quantity
  if (orderFromClient.quantity > orderedProductInDB.inventory.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // if order quantity is same as product inventory quantity
  // product inventory quantity will be 0
  // so change product inventory inStock status to false
  if (orderedProductInDB.inventory.quantity === orderFromClient.quantity) {
    orderedProductInDB.inventory.inStock = false;
  }

  // reduce the quantity in product inventory
  orderedProductInDB.inventory.quantity -= orderFromClient.quantity;

  // save all of the product document changes
  await orderedProductInDB.save();

  return await Order.create(orderFromClient);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOrdersFromDB = async (query: Record<string, any>) => {
  return await Order.find(query);
};

export const OrderServices = {
  saveOrderToDB,
  getOrdersFromDB,
};
