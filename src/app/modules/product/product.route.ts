import express from 'express';
import { ProductControllers } from './product.controller';

const productRouter = express.Router();

// create a new product
productRouter.post('/', ProductControllers.createProduct);

// get all products
productRouter.get('/', ProductControllers.fetchProducts);

// get a product by id
productRouter.get('/:productId', ProductControllers.fetchAProductById);

// update a product by id
productRouter.put('/:productId', ProductControllers.updateAProductById);

// delete a product by id
productRouter.delete('/:productId', ProductControllers.deleteAProductById);

export const ProductRoutes = productRouter;
