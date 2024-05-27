import { Schema, model } from 'mongoose';
import TOrder from './order.interface';

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'Email is missing in the order details'],
    match: [
      /^[a-z\d\._-]+@[a-z\d\._-]+\.[a-z]{2,6}$/, //eslint-disable-line no-useless-escape
      'The email is not valid',
    ],
    trim: true,
  },
  productId: {
    type: String,
    required: [true, 'productId is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1,
  },
});

export const Order = model<TOrder>('Order', OrderSchema);
