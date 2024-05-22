import express from 'express';
import { ProductControllers } from './product.controller';

const productRouter = express.Router();

// create a new product
productRouter.post('/', ProductControllers.createProduct);

export const ProductRoutes = productRouter;
