import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { NotFoundRoutes } from './not-found.route';
import { errorHandler } from './global.error';

const app = express();

// common middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// handle not found routes
app.use(NotFoundRoutes);

// global error handling
app.use(errorHandler);

export default app;
