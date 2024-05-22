import { z } from 'zod';

const VariantSchema = z.object({
  type: z.string(),
  value: z
    .string({
      required_error: 'Variant value is required',
    })
    .trim(),
});

const InventorySchema = z.object({
  quantity: z.number().gte(0),
  inStock: z.boolean(),
});

export const ProductSchema = z.object({
  name: z
    .string({
      required_error: 'Product name is required',
    })
    .trim()
    .min(5, { message: 'Product name must be at least 5 characters' })
    .max(80, { message: "Product name can't exceed 80 characters" }),
  description: z.string().optional().default('No description.'),
  price: z
    .number({
      required_error: 'Price is required',
    })
    .gte(0, { message: 'Price must be a positive number' })
    .refine(
      (price: number) => {
        if (Number.isInteger(price)) return true;
        if (String(price).split('.')[1].length < 3) return true;
        return false;
      },
      {
        message: 'Price must have no more than two decimals',
      }
    ),
  category: z
    .string({
      required_error: 'Category is required',
    })
    .trim(),
  tags: z
    .array(z.string(), { message: 'Tags are required' })
    .nonempty({ message: 'Provide at least a single tag' }),
  variants: z.array(VariantSchema),
  inventory: InventorySchema,
});
