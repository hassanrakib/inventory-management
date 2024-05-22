import { TProduct } from './product.interface';
import { Product } from './product.model';

const saveProductToDB = async (product: TProduct) => {
  // create a product document from Product model
  const productDoc = new Product(product);

  // save the productDoc to the db
  return await productDoc.save();
};

export const ProductServices = {
  saveProductToDB,
};
