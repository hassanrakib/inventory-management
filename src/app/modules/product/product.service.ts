import { Types } from 'mongoose';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const saveProductToDB = async (product: TProduct) => {
  // create a product document from Product model
  const productDoc = new Product(product);

  // save the productDoc to the db
  return await productDoc.save();
};

const retrieveProductsFromDB = async () => {
  // retrieve
  return await Product.find();
};

const retrieveAProductByIdFromDB = async (productId: string) => {
  // retrieve
  return await Product.findById(productId);
};

const updateAProductByIdInDB = async (
  productId: string,
  update: Partial<TProduct>
) => {
  // update
  return await Product.updateOne(
    { _id: new Types.ObjectId(productId) },
    { $set: update }
  );
};

const deleteAProductByIdFromDB = async (productId: string) => {
  // delete
  return await Product.deleteOne({ _id: new Types.ObjectId(productId) });
};

export const ProductServices = {
  saveProductToDB,
  retrieveProductsFromDB,
  retrieveAProductByIdFromDB,
  updateAProductByIdInDB,
  deleteAProductByIdFromDB,
};
