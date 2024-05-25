import { z } from 'zod';

export const OrderSchema = z.object({
  email: z
    .string({ required_error: 'Email is missing in the order details' })
    .email()
    .trim(),
  productId: z.string({ required_error: 'productId is required' }),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, { message: 'Price can not be negative' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, { message: 'Quantity must be greater than 0' }),
});
