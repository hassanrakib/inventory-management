import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
    trim: true,
  },
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [5, 'Product name must be at least 5 characters'],
    maxlength: [80, "Product name can't exceed 80 characters"],
  },
  description: { type: String, default: 'No description.' },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],

    validate: {
      // ensures that price doesn't have more than two decimals
      validator: (price: number) => Number.isInteger(price * 100),
      message: 'Price must have no more than two decimals',
    },
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: (tags: string[]) => Boolean(tags.length),
      message: 'Provide at least a single tag',
    },
  },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

// pre validation middleware to trim tags in the tags array
ProductSchema.pre('validate', function (next) {
  this.tags = this.tags.map((tag) => tag.trim());
  next();
});

// create a model
export const Product = model<TProduct>('Product', ProductSchema);
