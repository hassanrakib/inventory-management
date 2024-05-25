import { Document } from 'mongoose';

export default interface TOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}
