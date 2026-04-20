import { Router } from 'express';
import { InMemoryProductRepository } from '../adapters';
import { ProductController } from '../controllers';
import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductByIdUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
} from '../../application/use-cases';

const repository = new InMemoryProductRepository();

const controller = new ProductController(
  new GetProductsUseCase(repository),
  new GetProductByIdUseCase(repository),
  new CreateProductUseCase(repository),
  new UpdateProductUseCase(repository),
  new DeleteProductUseCase(repository)
);

export const productRouter = Router();

productRouter.get('/', controller.getAll);
productRouter.get('/:id', controller.getById);
productRouter.post('/', controller.create);
productRouter.put('/:id', controller.update);
productRouter.delete('/:id', controller.delete);
